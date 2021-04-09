package domore.api.model;

import domore.api.model.viewModel.SubjectViewModel;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotBlank(message = " Name of subject must not be empty")
    private String subjectName;

    @ManyToOne()
    private EducationStage educationStage;


    public Subject() {
    }

    public Subject(String subjectName, EducationStage educationStage) {

        this.subjectName = subjectName;
        this.educationStage = educationStage;

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

    public EducationStage getEducationStage() {
        return educationStage;
    }

    public void setEducationStage(EducationStage educationStage) {
        this.educationStage = educationStage;
    }

    public void updateFrom(SubjectViewModel toUpdate) {
        this.subjectName = toUpdate.getSubjectName();
    }

}
