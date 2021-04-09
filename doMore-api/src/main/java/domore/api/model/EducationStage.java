package domore.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import domore.api.model.viewModel.EducationStageViewModel;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class EducationStage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotBlank(message = " Education stage must not be empty")
    private String educationStage;

    @NotBlank(message = " Name must not be empty")
    private String name;

    @NotNull
    private int actualYear;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "educationStage", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Subject> subjectList;

    public EducationStage() {
        this.subjectList = new ArrayList<>();
    }

    public EducationStage(String educationStage, String name, int actualYear) {
        this.educationStage = educationStage;
        this.name = name;
        this.actualYear = actualYear;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEducationStage() {
        return educationStage;
    }

    public void setEducationStage(String educationStage) {
        this.educationStage = educationStage;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getActualYear() {
        return actualYear;
    }

    public void setActualYear(int actualYear) {
        this.actualYear = actualYear;
    }

    public List<Subject> getSubjectList() {
        return subjectList;
    }

    public void setSubjectList(List<Subject> subjectList) {
        this.subjectList = subjectList;
    }

    public void updateFrom(EducationStageViewModel toUpdate) {
        this.educationStage = toUpdate.getEducationStage();
        this.name = toUpdate.getName();
        this.actualYear = toUpdate.getActualYear();
    }
}
