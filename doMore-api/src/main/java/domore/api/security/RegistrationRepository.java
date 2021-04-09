package domore.api.security;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepository extends JpaRepository<User, Integer> {

    public User findByEmail(String emailId);

    public User findByEmailAndPassword(String emailId, String password);

    public User findAllByIfUserIsTrue();

}
