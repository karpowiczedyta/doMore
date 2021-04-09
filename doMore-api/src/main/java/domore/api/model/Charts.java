package domore.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
public class Charts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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


    @NotNull(message = "Time must not be null")
    private double time;

    public Charts() {
    }

    public Charts(String educationStage, String name, int actualYear, String subject,
                  String date, double time) {
        this.educationStage = educationStage;
        this.name = name;
        this.actualYear = actualYear;
        this.subject = subject;
        this.date = date;
        this.time = time;
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

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

}
