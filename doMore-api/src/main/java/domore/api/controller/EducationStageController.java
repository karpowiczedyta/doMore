package domore.api.controller;

import domore.api.adapter.EducationStageRepository;
import domore.api.adapter.SubjectRepository;
import domore.api.service.EducationStageAndSubjectService;
import domore.api.model.EducationStage;
import domore.api.model.viewModel.EducationStageViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/education-stages")
@CrossOrigin
public class EducationStageController {

    private static final Logger logger = LoggerFactory.getLogger(EducationStageController.class);
    private EducationStageRepository educationStageRepository;
    private SubjectRepository subjectRepository;
    private EducationStageAndSubjectService mapper;

    public EducationStageController(EducationStageRepository educationStageRepository, SubjectRepository subjectRepository, EducationStageAndSubjectService mapper) {
        this.educationStageRepository = educationStageRepository;
        this.subjectRepository = subjectRepository;
        this.mapper = mapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<EducationStageViewModel>> all() {
        var allStages = this.educationStageRepository.findAll()
                .stream()
                .map(eStage -> mapper.toEducationStageViewModel(eStage))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allStages);
    }

    @GetMapping("/all/educationStageDistinct")
    public ResponseEntity<List<String>> allDistinctEducationStage() {
        List<String> allDistinctStages = this.educationStageRepository.findAllDistinctEducationStage().get();
        return ResponseEntity.ok(allDistinctStages);
    }

    @PostMapping("/all/nameByEducationStageDistinct")
    public ResponseEntity<List<String>> allNameByEducationStageDistinct(@RequestBody EducationStageViewModel search) {

        List<String> allDistinctName = this.educationStageRepository.findAllNameByEducationStageDistinct(search.getEducationStageHelp()).get();
        return ResponseEntity.ok(allDistinctName);
    }

    @PostMapping("/all/actualYearByEducationStageAndNameDistinct")
    public ResponseEntity<List<Integer>> allActualYearByEducationStageAndNameDistinct(@RequestBody EducationStageViewModel search) {
        List<Integer> allDistinctYear = this.educationStageRepository
                .findAllActualYearByEducationStageAndNameDistinct(search.getEducationStageHelp(), search.getNameHelp()).get();
        return ResponseEntity.ok(allDistinctYear);
    }

    @PostMapping("/all/byNameAndActualYearAndEducationStage")
    public ResponseEntity<EducationStage> findByNameAndActualYearAndEducationStage(@RequestBody EducationStageViewModel search) {
        EducationStage choosenEStage = this.educationStageRepository
                .findByNameAndActualYearAndEducationStage(search.getEducationStage(), search.getName(), search.getActualYear()).get();
        return ResponseEntity.ok(choosenEStage);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody @Valid EducationStageViewModel viewModel) {

        Optional<EducationStage> vModel = this.educationStageRepository
                .findByNameAndActualYearAndEducationStage(viewModel.getEducationStage(), viewModel.getName(), viewModel.getActualYear());
        if (vModel.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        var educationStageEntity = this.mapper.toEducationStage(viewModel);
        educationStageEntity = this.educationStageRepository.save(educationStageEntity);
        return ResponseEntity.created(URI.create("/" + educationStageEntity.getId())).body(educationStageEntity);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        this.educationStageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<?> updateEducationStage(@PathVariable int id, @RequestBody @Valid EducationStageViewModel toUpdate) {
        if (!educationStageRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        educationStageRepository.findById(id)
                .ifPresent(eStage -> {
                    eStage.updateFrom(toUpdate);
                    educationStageRepository.save(eStage);
                });
        return ResponseEntity.noContent().build();
    }

}
