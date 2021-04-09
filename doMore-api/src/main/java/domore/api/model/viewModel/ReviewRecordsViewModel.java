package domore.api.model.viewModel;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ReviewRecordsViewModel {

    private int id;

    @NotBlank(message = " Education stage must not be empty")
    private String educationStage;

    @NotBlank(message = " Name class/profile must not be empty")
    private String name;

    @NotNull(message = "Actual year of study must not be null")
    private int actualYear;

    private String subject;

    @NotBlank(message = "Date must not be empty")
    private String date;

    private String startTime;

    private String endTime;

    private int hours;

    private int minutes;

    private int seconds;

    public ReviewRecordsViewModel() {
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

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public int getMinutes() {
        return minutes;
    }

    public void setMinutes(int minutes) {
        this.minutes = minutes;
    }

    public int getSeconds() {
        return seconds;
    }

    public void setSeconds(int seconds) {
        this.seconds = seconds;
    }
}
