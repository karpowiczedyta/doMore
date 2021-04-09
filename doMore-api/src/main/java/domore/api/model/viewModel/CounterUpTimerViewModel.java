package domore.api.model.viewModel;

import domore.api.model.CounterUpTimer;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class CounterUpTimerViewModel {

    private int id;

    @NotBlank(message = " Education stage must not be empty")
    private String educationStage;

    @NotBlank(message = " Name class/profile must not be empty")
    private String name;

    @NotNull(message = "Actual year of study must not be null")
    private int actualYear;

    @NotBlank(message = "Name of subject must not be empty")
    private String subject;


    private Date date;

    private Date startTime;

    private Date endTime;

    private int hours;

    private int minutes;

    private int seconds;

    private String educationStageHelp;

    private String nameHelp;

    public CounterUpTimerViewModel() {
    }

    public CounterUpTimerViewModel(CounterUpTimer counterUpTimer) {
        this.id = counterUpTimer.getId();
        this.educationStage = counterUpTimer.getEducationStage();
        this.name = counterUpTimer.getName();
        this.actualYear = counterUpTimer.getActualYear();
        this.subject = counterUpTimer.getSubject();
        this.date = counterUpTimer.getDate();
        this.startTime = counterUpTimer.getStartTime();
        this.endTime = counterUpTimer.getEndTime();
        this.hours = counterUpTimer.getHours();
        this.minutes = counterUpTimer.getMinutes();
        this.seconds = counterUpTimer.getSeconds();
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
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
