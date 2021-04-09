package domore.api.controller;

import domore.api.adapter.BreakRepository;
import domore.api.adapter.CounterUpTimerRepository;
import domore.api.model.viewModel.ChartsViewModel;
import domore.api.service.ChartsForSubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/charts")
@CrossOrigin
public class ChartsForSubjectController {
    public static final Logger logger = LoggerFactory.getLogger(ChartsForSubjectController.class);
    CounterUpTimerRepository counterUpTimerRepository;
    BreakRepository breakRepository;
    ChartsForSubjectService chartsService;

    public ChartsForSubjectController(CounterUpTimerRepository counterUpTimerRepository, BreakRepository breakRepository, ChartsForSubjectService chartsService) {
        this.counterUpTimerRepository = counterUpTimerRepository;
        this.breakRepository = breakRepository;
        this.chartsService = chartsService;
    }

    @PostMapping("/subject/getByDay")
    public ResponseEntity<ChartsViewModel> getDateAndTimePerDay(@RequestBody @Valid ChartsViewModel search){
        ChartsViewModel newObj = this.chartsService.dateAndTimePerThisDate(search);
        return ResponseEntity.ok(newObj);
    }

    @PostMapping("/subject/getByWeek")
    public ResponseEntity<List<ChartsViewModel>> getDateAndTimePerWeek(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.dateAndTimePerWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getByMonth")
    public ResponseEntity<List<ChartsViewModel>> getDateAndTimePerMonth(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.dateAndTimePerMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getByYear")
    public ResponseEntity<List<ChartsViewModel>> getDateAndTimePerYear(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.dateAndTimePerYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getPreviousDate")
    public ResponseEntity<List<ChartsViewModel>> getPreviousDate(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getPreviousDate(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getNextDate")
    public ResponseEntity<List<ChartsViewModel>> getNextDate(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getNextDate(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getPreviousWeek")
    public ResponseEntity<List<ChartsViewModel>> getPreviousWeek(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getPreviousWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getNextWeek")
    public ResponseEntity<List<ChartsViewModel>> getNextWeek(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getNextWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getPreviousMonth")
    public ResponseEntity<List<ChartsViewModel>> getPreviousMonth(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getPreviousMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getNextMonth")
    public ResponseEntity<List<ChartsViewModel>> getNextMonth(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getNextMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getPreviousYear")
    public ResponseEntity<List<ChartsViewModel>> getPreviousYear(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getPreviousYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/subject/getNextYear")
    public ResponseEntity<List<ChartsViewModel>> getNextYear(@RequestBody @Valid ChartsViewModel search){
        List<ChartsViewModel> chartsViewModelList = this.chartsService.getNextYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

}
