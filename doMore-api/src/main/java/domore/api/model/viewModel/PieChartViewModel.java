package domore.api.model.viewModel;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

public class PieChartViewModel {

    @NotBlank(message = " Education stage must not be empty")
    private String educationStage;

    @NotBlank(message = " Name class/profile must not be empty")
    private String name;

    @NotNull(message = "Actual year of study must not be null")
    private int actualYear;

    private List<String> subjectList;

    @NotBlank(message = "Date must not be empty")
    private String date;

    private List<String> dateList;

    private List<Double> timeList;

    public PieChartViewModel() {
    }

    public PieChartViewModel(PieChartViewModel search
    ) {
        this.educationStage = search.getEducationStage();
        this.name = search.getName();
        this.actualYear = search.getActualYear();
        this.subjectList = search.getSubjectList();
        this.date = search.getDate();
        this.dateList = search.getDateList();
        this.timeList = search.getTimeList();

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


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<String> getDateList() {
        return dateList;
    }

    public void setDateList(List<String> dateList) {
        this.dateList = dateList;
    }

    public List<String> getSubjectList() {
        return subjectList;
    }

    public void setSubjectList(List<String> subjectList) {
        this.subjectList = subjectList;
    }

    public List<Double> getTimeList() {
        return timeList;
    }

    public void setTimeList(List<Double> timeList) {
        this.timeList = timeList;
    }
}
