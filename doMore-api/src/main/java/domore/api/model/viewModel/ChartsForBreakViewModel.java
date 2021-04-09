package domore.api.model.viewModel;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ChartsForBreakViewModel {

    @NotBlank(message = "Date must not be empty")
    private String date;

    @NotNull(message = "Time must not be null")
    private double time;

    public ChartsForBreakViewModel(String date, double time) {
        this.date = date;
        this.time = time;
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
