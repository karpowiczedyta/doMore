package domore.api.security;

import org.springframework.stereotype.Component;

@Component
public class RegistrationService {

    private RegistrationRepository repo;

    public RegistrationService(RegistrationRepository repo) {
        this.repo = repo;
    }

    public User saveUser(User user){
       return repo.save(user);
    }

    public User fetchUserByEmailId(String email){
        return repo.findByEmail(email);
    }

    public User fetchUserByEmailIdAndPassword(String email, String password){
        return repo.findByEmailAndPassword(email, password);
    }

}
