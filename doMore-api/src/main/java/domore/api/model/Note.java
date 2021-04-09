package domore.api.model;

import domore.api.model.viewModel.NoteViewModel;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @NotBlank(message = "Note's title must not be empty")
    private String title;
    @NotBlank(message = "Task's text must not be empty")
    private String text;

    @ManyToOne()
    private Notebook notebook;

    private Date lastModifiedOn;

    public Note() {
        this.lastModifiedOn = new Date();
    }

    public Note(String title, String text, Notebook notebook) {
        this();
        this.title = title;
        this.text = text;
        if (notebook != null) {
            this.notebook = notebook;
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public Notebook getNotebook() {
        return notebook;
    }

    public void setNotebook(Notebook notebook) {
        this.notebook = notebook;
    }

    public Date getLastModifiedOn() {
        return lastModifiedOn;
    }

    public void setLastModifiedOn(Date lastModifiedOn) {
        this.lastModifiedOn = lastModifiedOn;
    }

    public Note updateFrom(NoteViewModel toUpdate) {
        this.title = toUpdate.getTitle();
        this.text = toUpdate.getText();
        this.lastModifiedOn = new Date();
        return this;
    }
}
