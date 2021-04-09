package domore.api.controller;

import domore.api.adapter.BreakRepository;
import domore.api.service.CounterUpTimerAndBreakService;
import domore.api.model.Break;
import domore.api.model.viewModel.BreakViewModel;
import domore.api.model.viewModel.ReviewRecordsViewModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/break")
@CrossOrigin
public class BreakController {
    BreakRepository breakRepository;
    CounterUpTimerAndBreakService counterUpTimerAndBreakService;

    public BreakController(BreakRepository breakRepository, CounterUpTimerAndBreakService counterUpTimerAndBreakService) {
        this.breakRepository = breakRepository;
        this.counterUpTimerAndBreakService = counterUpTimerAndBreakService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<BreakViewModel>> all() {
        var allRecords = this.breakRepository.findAll()
                .stream()
                .map(breakRecord -> counterUpTimerAndBreakService.toBreakViewModel(breakRecord))
                .collect(Collectors.toList());
        return ResponseEntity.ok(allRecords);
    }

    @PostMapping
    public ResponseEntity<Break> save(@RequestBody @Valid BreakViewModel breakViewModel) {
        var breakEntity = this.counterUpTimerAndBreakService.toBreak(breakViewModel);
        breakEntity = this.breakRepository.save(breakEntity);
        return ResponseEntity.created(URI.create("/" + breakEntity.getId())).body(breakEntity);
    }

    @PostMapping("/summaryByDay")
    public ResponseEntity<ReviewRecordsViewModel> countSummaryByDay(@RequestBody ReviewRecordsViewModel search) {
        Integer hours = this.breakRepository
                .countHours(search.getDate())
                .get();
        Integer minutes = this.breakRepository
                .countMinutes(search.getDate())
                .get();
        Integer seconds = this.breakRepository
                .countSeconds(search.getDate())
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        this.breakRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteAll() {
        this.breakRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
