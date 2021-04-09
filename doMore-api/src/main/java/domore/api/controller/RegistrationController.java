package domore.api.controller;

import domore.api.security.RegistrationRepository;
import domore.api.security.User;
import domore.api.security.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.util.List;

@Controller
@CrossOrigin
public class RegistrationController {

    private RegistrationRepository repository;
    private RegistrationService service;

    public RegistrationController(RegistrationRepository repository, RegistrationService service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/ifExistUser")
    public ResponseEntity<User> existUser(@RequestBody User user){
        String error = "";
        List<User> ifExistUser = repository.findAll();
        if(ifExistUser.size() != 0){
            error = "This username is already in use";
            System.out.println(error);
        }

        user.setError(error);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/registration")
    public ResponseEntity<User> registerUser(@RequestBody User user) throws Exception {
        String tempEmailId =  user.getEmail();
        if(tempEmailId != null && !"".equals(tempEmailId)){
            User userObj = service.fetchUserByEmailId(tempEmailId);
            if(userObj != null){
                throw new Exception("user with " + tempEmailId + "is already exists");
            }
        }
        User userObj = null;
        userObj = service.saveUser(user);
        return ResponseEntity.created(URI.create("/" + userObj.getId())).body(userObj);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) throws Exception {
        String tmpEmailId = user.getEmail();
        String tmpPassword = user.getPassword();
        User userObj = null;
        if(tmpEmailId != null && tmpPassword != null){
           userObj =  service.fetchUserByEmailIdAndPassword(tmpEmailId, tmpPassword);
            userObj.setIfUser(true);
            repository.save(userObj);
        }
        if(userObj == null){
            throw new Exception("bad credentials");
        }
        return ResponseEntity.ok(userObj);
    }

    @PostMapping("/checkPassword")
    public ResponseEntity<User> checkPassword(@RequestBody User user) throws Exception {
        String tmpEmailId = user.getEmail();
        String tmpPassword = user.getPassword();
        User userObj = null;
        if(tmpEmailId != null && tmpPassword != null){
            userObj =  service.fetchUserByEmailIdAndPassword(tmpEmailId, tmpPassword);
        }
        if(userObj == null){
            throw new Exception("bad credentials");
        }
        return ResponseEntity.ok(userObj);
    }

    @GetMapping("/logout")
    public ResponseEntity<User> logoutUser() throws Exception {

        User user = repository.findAllByIfUserIsTrue();
        user.setIfUser(false);
        repository.save(user);

        return ResponseEntity.ok(user);

    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser() throws Exception {

        User user = repository.findAllByIfUserIsTrue();

        return ResponseEntity.ok(user);

    }

    @PostMapping("/changeDataAboutUser")
    public ResponseEntity<User> changeDateAboutUser(@RequestBody User user) throws Exception {

        User userId = repository.findById(user.getId()).get();
        userId.setFirstName(user.getFirstName());
        userId.setLastName(user.getLastName());
        userId.setEmail(user.getEmail());
        User updated = repository.save(userId);
        return ResponseEntity.ok(updated);

    }

    @PostMapping("/changePassword")
    public ResponseEntity<User> changePassword(@RequestBody User user) throws Exception {

        User userId = repository.findById(user.getId()).get();
        userId.setPassword(user.getPassword());
        User updated = repository.save(userId);
        return ResponseEntity.ok(updated);

    }

}
