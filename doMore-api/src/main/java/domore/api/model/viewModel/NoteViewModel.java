package domore.api.model.viewModel;

import domore.api.model.Note;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;

public class NoteViewModel {
    private int id;

    @NotBlank(message = "Note's title must not be empty")
    @Min(3)
    private String title;

    @NotBlank(message = "Task's text must not be empty")
    private String text;

    @NotBlank(message = "Notebook's id must not be empty")
    private Integer notebookId;

    private Date lastModifiedOn;

    public NoteViewModel() {
    }

    public NoteViewModel(Note note) {
        this.id = note.getId();
        this.title = note.getTitle();
        this.text = note.getText();
        this.lastModifiedOn = note.getLastModifiedOn();
        this.notebookId = note.getNotebook().getId();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getNotebookId() {
        return notebookId;
    }

    public void setNotebookId(Integer notebookId) {
        this.notebookId = notebookId;
    }

    public Date getLastModifiedOn() {
        return lastModifiedOn;
    }

    public void setLastModifiedOn(Date lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }
}