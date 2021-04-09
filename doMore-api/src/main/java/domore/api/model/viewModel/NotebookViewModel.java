package domore.api.model.viewModel;

import domore.api.model.Notebook;
import javax.validation.constraints.NotBlank;


public class NotebookViewModel {
    private Integer id;

    @NotBlank(message = "Notebook's name must not be empty")
    private String name;

    private int nbNotes;

    public NotebookViewModel() {
    }

    public NotebookViewModel(Notebook notebook) {
        this.id = notebook.getId();
        this.name = notebook.getName();
        this.nbNotes = notebook.getNotes().size();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNbNotes() {
        return nbNotes;
    }

    public void setNbNotes(int nbNotes) {
        this.nbNotes = nbNotes;
    }
}
