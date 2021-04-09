package domore.api.security;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = " First name must not be empty")
    private String firstName;
    @NotBlank(message = " Last name must not be empty")
    private String lastName;
    @NotBlank(message = " Email must not be empty")
    private String email;
    @NotBlank(message = " Password must not be empty")
    private String password;
    private String error;
    private boolean ifUser;

    public User() {
    }

    public User(String firstName, String lastName, String email, String password, String error, boolean ifUser) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.error = error;
        this.ifUser = ifUser;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public boolean isIfUser() {
        return ifUser;
    }

    public void setIfUser(boolean ifUser) {
        this.ifUser = ifUser;
    }
}

