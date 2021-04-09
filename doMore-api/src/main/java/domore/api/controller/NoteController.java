package domore.api.controller;

import domore.api.adapter.NoteRepository;
import domore.api.adapter.NotebookRepository;
import domore.api.service.NoteAndNotebookService;
import domore.api.model.Note;
import domore.api.model.viewModel.NoteViewModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.ValidationException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/notes")
@CrossOrigin
public class NoteController {
    private NoteRepository noteRepository;
    private NotebookRepository notebookRepository;
    private NoteAndNotebookService mapper;

    public NoteController(NoteRepository noteRepository, NotebookRepository notebookRepository, NoteAndNotebookService mapper) {
        this.noteRepository = noteRepository;
        this.notebookRepository = notebookRepository;
        this.mapper = mapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<NoteViewModel>> all() {

        var notesViewModel = this.noteRepository.findAll()
                .stream()
                .map(note -> this.mapper.toNoteViewModel(note))
                .collect(Collectors.toList());
        return ResponseEntity.ok(notesViewModel);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteViewModel> byId(@PathVariable int id) {
        var note = this.noteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Note with given id not found"));
        var noteViewModel = this.mapper.toNoteViewModel(note);
        return ResponseEntity.ok(noteViewModel);
    }

    @GetMapping("/byNotebook/{notebookId}")
    public ResponseEntity<List<NoteViewModel>> byNotebook(@PathVariable Integer notebookId) {

        List<Note> notes;

        var notebook = this.notebookRepository.findById(notebookId)
                .orElseThrow(() -> new IllegalArgumentException("Notebook with given id not found"));

        notes = this.noteRepository.findAllByNotebook(notebook);

        var notesViewModel = notes.stream()
                .map(note -> this.mapper.toNoteViewModel(note))
                .collect(Collectors.toList());

        return ResponseEntity.ok(notesViewModel);
    }

    @PostMapping
    public ResponseEntity<Note> save(@RequestBody NoteViewModel noteViewModel, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException();
        }

        Note noteEntity = this.mapper.toNote(noteViewModel);

        noteEntity = this.noteRepository.save(noteEntity);

        return ResponseEntity.created(URI.create("/" + noteEntity.getId())).body(noteEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        this.noteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<Note> updateNote(@PathVariable int id, @RequestBody NoteViewModel toUpdate,
                                    BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException();
        }

        final Note newNote;
        Note returnedNote = noteRepository.findById(id).get();
        newNote = returnedNote.updateFrom(toUpdate);
        noteRepository.save(newNote);
        return ResponseEntity.ok(newNote);

    }


}
