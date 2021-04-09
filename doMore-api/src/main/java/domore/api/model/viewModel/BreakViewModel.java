package domore.api.model.viewModel;

import domore.api.model.Break;
import java.util.Date;

public class BreakViewModel {

    private int id;

    private Date date;

    private Date startTime;

    private Date endTime;

    private int hours;

    private int minutes;

    private int seconds;

    public BreakViewModel() {
    }

    public BreakViewModel(Break breakk) {
        this.id = breakk.getId();
        this.date = breakk.getDate();
        this.startTime = breakk.getStartTime();
        this.endTime = breakk.getEndTime();
        this.hours = breakk.getHours();
        this.minutes = breakk.getMinutes();
        this.seconds = breakk.getSeconds();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}
