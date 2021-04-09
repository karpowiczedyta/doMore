package domore.api.controller;

import domore.api.adapter.CounterUpTimerRepository;
import domore.api.service.CounterUpTimerAndBreakService;
import domore.api.model.CounterUpTimer;
import domore.api.model.viewModel.CounterUpTimerViewModel;
import domore.api.model.viewModel.ReviewRecordsViewModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/counterUpTimer")
@CrossOrigin
public class CounterUpTimerController {
    CounterUpTimerRepository counterUpTimerRepository;
    CounterUpTimerAndBreakService counterUpTimerAndBreakService;

    public CounterUpTimerController(CounterUpTimerRepository counterUpTimerRepository, CounterUpTimerAndBreakService counterUpTimerAndBreakService) {
        this.counterUpTimerRepository = counterUpTimerRepository;
        this.counterUpTimerAndBreakService = counterUpTimerAndBreakService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CounterUpTimerViewModel>> all() {
        var allRecords = this.counterUpTimerRepository.findAll()
                .stream()
                .map(counterRecord -> counterUpTimerAndBreakService.toCounterUpTimerViewModel(counterRecord))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allRecords);
    }

    @PostMapping
    public ResponseEntity<CounterUpTimer> save(@RequestBody @Valid CounterUpTimerViewModel counterUpTimerViewModel) {
        var counterUpTimerEntity = this.counterUpTimerAndBreakService.toCounterUpTimer(counterUpTimerViewModel);
        counterUpTimerEntity = this.counterUpTimerRepository.save(counterUpTimerEntity);
        return ResponseEntity.created(URI.create("/" + counterUpTimerEntity.getId())).body(counterUpTimerEntity);
    }

    @GetMapping("/all/educationStageDistinct")
    public ResponseEntity<List<String>> allEducationStageDistinct() {
        List<String> allEducationStagesDistinct = this.counterUpTimerRepository.findAllEducationStageDistinct().get();
        return ResponseEntity.ok(allEducationStagesDistinct);
    }

    @PostMapping("/all/nameByEducationStageDistinct")
    public ResponseEntity<List<String>> allNameByEducationStageDistinct(@RequestBody CounterUpTimerViewModel search) {
        List<String> allDistinctName = this.counterUpTimerRepository.findAllNameByEducationStageDistinct(search.getEducationStageHelp()).get();
        return ResponseEntity.ok(allDistinctName);
    }

    @PostMapping("/all/actualYearByEducationStageAndNameDistinct")
    public ResponseEntity<List<Integer>> allActualYearByEducationStageAndNameDistinct(@RequestBody CounterUpTimerViewModel search) {
        List<Integer> allDistinctYear = this.counterUpTimerRepository
                .findAllActualYearByEducationStageAndNameDistinct(search.getEducationStageHelp(), search.getNameHelp()).get();
        return ResponseEntity.ok(allDistinctYear);
    }

    @PostMapping("/all/subjectsByNameAndActualYearAndEducationStage")
    public ResponseEntity<List<String>> findSubjectsByNameAndActualYearAndEducationStage(@RequestBody CounterUpTimerViewModel search) {
        List<String> subjects = this.counterUpTimerRepository
                .findAllSubjectsByNameAndActualYearAndEducationStageDistinct(search.getEducationStage(), search.getName(), search.getActualYear()).get();
        return ResponseEntity.ok(subjects);
    }

    @PostMapping("/allByDate")
    public ResponseEntity<List<CounterUpTimer>> findAllByDate(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllByDate(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/allBySubject")
    public ResponseEntity<List<CounterUpTimer>> findAllBySubject(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllBySubject(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate(), search.getSubject())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/allByStartTime")
    public ResponseEntity<List<CounterUpTimer>> findAllByStartTime(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllByStartTime(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate(), search.getStartTime())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/allByEndTime")
    public ResponseEntity<List<CounterUpTimer>> findAllByEndTime(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllByEndTime(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate(), search.getEndTime())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/allBySubjectAndStartTimeAndEndTime")
    public ResponseEntity<List<CounterUpTimer>> findAllBySubjectAndStartTimeAndEndTime(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllBySubjectAndStartTimeAndEndTime(search.getEducationStage(), search.getName(), search.getActualYear(),
                        search.getDate(), search.getSubject(), search.getStartTime(), search.getEndTime())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/allBySubjectAndStartTime")
    public ResponseEntity<List<CounterUpTimer>> findAllBySubjectAndStartTime(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllBySubjectAndStartTime(search.getEducationStage(), search.getName(), search.getActualYear(),
                        search.getDate(), search.getSubject(), search.getStartTime())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/allBySubjectAndEndTime")
    public ResponseEntity<List<CounterUpTimer>> findAllBySubjectAndEndTime(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllBySubjectAndEndTime(search.getEducationStage(), search.getName(), search.getActualYear(),
                        search.getDate(), search.getSubject(), search.getEndTime())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/allByStartTimeAndEndTime")
    public ResponseEntity<List<CounterUpTimer>> findAllByStartTimeAndEndTime(@RequestBody ReviewRecordsViewModel search) {
        List<CounterUpTimer> result = this.counterUpTimerRepository
                .findAllByStartTimeAndEndTime(search.getEducationStage(), search.getName(), search.getActualYear(),
                        search.getDate(), search.getStartTime(), search.getEndTime())
                .get();
        return ResponseEntity.ok(result);
    }

    @PostMapping("/summaryByDay")
    public ResponseEntity<ReviewRecordsViewModel> countSummaryByDay(@RequestBody ReviewRecordsViewModel search) {
        Integer hours = this.counterUpTimerRepository
                .countHours(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate())
                .get();
        Integer minutes = this.counterUpTimerRepository
                .countMinutes(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate())
                .get();
        Integer seconds = this.counterUpTimerRepository
                .countSeconds(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate())
                .get();

        minutes += seconds / 60;
        seconds = seconds % 60;
        hours += minutes / 60;
        minutes = minutes % 60;

        search.setHours(hours);
        search.setMinutes(minutes);
        search.setSeconds(seconds);

        return ResponseEntity.ok(search);
    }

    @PostMapping("/summaryByDayAndSubject")
    public ResponseEntity<ReviewRecordsViewModel> countSummaryByDayAndSubject(@RequestBody ReviewRecordsViewModel search) {
        Integer hours = this.counterUpTimerRepository
                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate(), search.getSubject())
                .get();
        Integer minutes = this.counterUpTimerRepository
                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate(), search.getSubject())
                .get();
        Integer seconds = this.counterUpTimerRepository
                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), search.getDate(), search.getSubject())
                .get();

        minutes += seconds / 60;
        seconds = seconds % 60;
        hours += minutes / 60;
        minutes = minutes % 60;

        search.setHours(hours);
        search.setMinutes(minutes);
        search.setSeconds(seconds);

        return ResponseEntity.ok(search);

    }

    @PatchMapping("/{id}")
    ResponseEntity<?> updateEducationStage(@PathVariable int id, @RequestBody @Valid CounterUpTimerViewModel toUpdate) {
        if (!counterUpTimerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        counterUpTimerRepository.findById(id)
                .ifPresent(eStage -> {
                    eStage.updateFrom(toUpdate);
                    counterUpTimerRepository.save(eStage);
                });
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        this.counterUpTimerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        this.counterUpTimerRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
