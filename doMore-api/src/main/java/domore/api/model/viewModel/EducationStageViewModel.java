package domore.api.model.viewModel;

import domore.api.model.EducationStage;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class EducationStageViewModel {

    int nbSubjects;
    String educationStageHelp;
    String nameHelp;
    private int id;
    @NotBlank(message = " Education stage must not be empty")
    private String educationStage;
    @NotBlank(message = " Name must not be empty")
    private String name;
    @NotNull
    private int actualYear;

    public EducationStageViewModel() {
    }

    public EducationStageViewModel(EducationStage eStage) {
        this.id = eStage.getId();
        this.educationStage = eStage.getEducationStage();
        this.name = eStage.getName();
        this.actualYear = eStage.getActualYear();
        this.nbSubjects = eStage.getSubjectList().size();
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

    public int getNbSubjects() {
        return nbSubjects;
    }

    public void setNbSubjects(int nbSubjects) {
        this.nbSubjects = nbSubjects;
    }

    public String getEducationStageHelp() {
        return educationStageHelp;
    }

    public void setEducationStageHelp(String educationStageHelp) {
        this.educationStageHelp = educationStageHelp;
    }

    public String getNameHelp() {
        return nameHelp;
    }

    public void setNameHelp(String nameHelp) {
        this.nameHelp = nameHelp;
    }

}
