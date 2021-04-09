package domore.api.model.viewModel;

import domore.api.model.Charts;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ChartsViewModel {

    @NotBlank(message = " Education stage must not be empty")
    private String educationStage;

    @NotBlank(message = " Name class/profile must not be empty")
    private String name;

    @NotNull(message = "Actual year of study must not be null")
    private int actualYear;

    private String subject;

    @NotBlank(message = "Date must not be empty")
    private String date;

    @NotNull(message = "Actual year of study must not be null")
    private double time;


    public ChartsViewModel() {
    }

    public ChartsViewModel(Charts charts) {
        this.educationStage = charts.getEducationStage();
        this.name = charts.getName();
        this.actualYear = charts.getActualYear();
        this.subject = charts.getSubject();
        this.date = charts.getDate();
        this.time = charts.getTime();

    }

    public ChartsViewModel(ChartsViewModel search, double time, String dateToSearch
    ) {
        this.educationStage = search.getEducationStage();
        this.name = search.getName();
        this.actualYear = search.getActualYear();
        this.subject = search.getSubject();
        this.date = dateToSearch;
        this.time = time;

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

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

}
