package domore.api.service;

import domore.api.adapter.NotebookRepository;
import domore.api.model.Note;
import domore.api.model.Notebook;
import domore.api.model.viewModel.NoteViewModel;
import domore.api.model.viewModel.NotebookViewModel;
import org.springframework.stereotype.Component;

@Component
public class NoteAndNotebookService {

    NotebookRepository notebookRepository;

    public NoteAndNotebookService(NotebookRepository notebookRepository) {
        this.notebookRepository = notebookRepository;
    }

    public Note toNote(NoteViewModel noteViewModel) {
        Notebook notebook = notebookRepository.findById(noteViewModel.getNotebookId())
                .orElseThrow(() -> new IllegalArgumentException("Notebook with given id not found"));

        return new Note(noteViewModel.getTitle(), noteViewModel.getText(), notebook);
    }

    public Notebook toNotebook(NotebookViewModel notebookViewModel) {
        return new Notebook(notebookViewModel.getName());
    }

    public NoteViewModel toNoteViewModel(Note note) {
        return new NoteViewModel(note);

    }

    public NotebookViewModel toNotebookViewModel(Notebook notebook) {
        return new NotebookViewModel(notebook);

    }


}
