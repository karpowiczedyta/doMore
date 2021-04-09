package domore.api.controller;

import domore.api.adapter.NotebookRepository;
import domore.api.service.NoteAndNotebookService;
import domore.api.model.Notebook;
import domore.api.model.viewModel.NotebookViewModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/notebooks")
@CrossOrigin
public class NotebookController {
    private NotebookRepository notebookRepository;
    private NoteAndNotebookService mapper;

    public NotebookController(NotebookRepository notebookRepository, NoteAndNotebookService mapper) {
        this.notebookRepository = notebookRepository;
        this.mapper = mapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<NotebookViewModel>> all() {
        var allCategories = this.notebookRepository.findAll()
                .stream()
                .map(notebook -> mapper.toNotebookViewModel(notebook))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allCategories);
    }

    @PostMapping
    public ResponseEntity<Notebook> save(@RequestBody @Valid NotebookViewModel notebookViewModel) {


        var notebookEntity = this.mapper.toNotebook(notebookViewModel);

        notebookEntity = this.notebookRepository.save(notebookEntity);

        return ResponseEntity.created(URI.create("/" + notebookEntity.getId())).body(notebookEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        this.notebookRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<?> updateNotebook(@PathVariable int id, @RequestBody @Valid NotebookViewModel toUpdate) {
        if (!notebookRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        notebookRepository.findById(id)
                .ifPresent(notebook -> {
                    notebook.updateFrom(toUpdate);
                    notebookRepository.save(notebook);
                });
        return ResponseEntity.noContent().build();
    }
}

