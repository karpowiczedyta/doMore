package domore.api.model.viewModel;

import domore.api.model.Subject;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class SubjectViewModel {

    private int id;

    @NotBlank(message = " Name of subject must not be empty")
    private String subjectName;

    @NotNull
    private Integer educationStageId;

    public SubjectViewModel() {

    }

    public SubjectViewModel(Subject subject) {
        this.id = subject.getId();
        this.subjectName = subject.getSubjectName();
        this.educationStageId = subject.getEducationStage().getId();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public Integer getEducationStageId() {
        return educationStageId;
    }

    public void setEducationStageId(Integer educationStageId) {
        this.educationStageId = educationStageId;
    }
}
