package domore.api.controller;

import domore.api.adapter.EducationStageRepository;
import domore.api.adapter.SubjectRepository;
import domore.api.service.EducationStageAndSubjectService;
import domore.api.model.Subject;
import domore.api.model.viewModel.SubjectViewModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.ValidationException;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/subjects")
@CrossOrigin
public class SubjectController {
    EducationStageRepository educationStageRepository;
    SubjectRepository subjectRepository;
    EducationStageAndSubjectService mapper;

    public SubjectController(SubjectRepository subjectRepository, EducationStageAndSubjectService mapper,
                             EducationStageRepository educationStageRepository) {
        this.subjectRepository = subjectRepository;
        this.mapper = mapper;
        this.educationStageRepository = educationStageRepository;
    }

    @GetMapping("/all")
    public ResponseEntity<List<SubjectViewModel>> all() {

        var subjectsViewModel = this.subjectRepository.findAll()
                .stream()
                .map(subject -> this.mapper.toSubjectViewModel(subject))
                .collect(Collectors.toList());
        return ResponseEntity.ok(subjectsViewModel);
    }

    @GetMapping("/byEducationStage/{educationStageId}")
    public ResponseEntity<List<SubjectViewModel>> byEducationStage(@PathVariable Integer educationStageId) {

        List<Subject> subjects;

        var educationStage = this.educationStageRepository.findById(educationStageId)
                .orElseThrow(() -> new IllegalArgumentException("Education stage with given id not found"));

        subjects = this.subjectRepository.findAllByEducationStage(educationStage);

        var subjectsViewModel = subjects.stream()
                .map(subject -> this.mapper.toSubjectViewModel(subject))
                .collect(Collectors.toList());

        return ResponseEntity.ok(subjectsViewModel);
    }

    @GetMapping("/byEducationStageSubjectDistinct/{educationStageId}")
    public ResponseEntity<List<String>> byEducationStageSubjectDistinct(@PathVariable Integer educationStageId) {

        List<String> subjects;

        var educationStage = this.educationStageRepository.findById(educationStageId)
                .orElseThrow(() -> new IllegalArgumentException("Education stage with given id not found"));

        subjects = this.subjectRepository.findAllByEducationStageDistinct(educationStage.getId()).get();

        return ResponseEntity.ok(subjects);
    }

    @PostMapping
    public ResponseEntity<Subject> save(@RequestBody SubjectViewModel subjectViewModel, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new ValidationException();
        }

        Subject subjectEntity = this.mapper.toSubject(subjectViewModel);

        subjectEntity = this.subjectRepository.save(subjectEntity);

        return ResponseEntity.created(URI.create("/" + subjectEntity.getId())).body(subjectEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        this.subjectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<?> updateSubject(@PathVariable int id, @RequestBody @Valid SubjectViewModel toUpdate) {
        if (!subjectRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        subjectRepository.findById(id)
                .ifPresent(subject -> {
                    subject.updateFrom(toUpdate);
                    subjectRepository.save(subject);
                });
        return ResponseEntity.noContent().build();
    }

}
