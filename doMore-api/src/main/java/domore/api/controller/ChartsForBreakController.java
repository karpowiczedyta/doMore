package domore.api.controller;

import domore.api.adapter.BreakRepository;
import domore.api.model.viewModel.ChartsForBreakViewModel;
import domore.api.service.ChartsForBreakService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/charts/break")
@CrossOrigin
public class ChartsForBreakController {
    BreakRepository breakRepository;
    ChartsForBreakService chartsForBreakService;

    public ChartsForBreakController(BreakRepository breakRepository, ChartsForBreakService chartsForBreakService) {
        this.breakRepository = breakRepository;
        this.chartsForBreakService = chartsForBreakService;
    }

    @PostMapping("/getByDay")
    public ResponseEntity<ChartsForBreakViewModel> getDateAndTimePerDay(@RequestBody @Valid ChartsForBreakViewModel search) {
        ChartsForBreakViewModel newObj = this.chartsForBreakService.dateAndTimePerThisDate(search);
        return ResponseEntity.ok(newObj);
    }

    @PostMapping("/getByWeek")
    public ResponseEntity<List<ChartsForBreakViewModel>> getDateAndTimePerWeek(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.dateAndTimePerWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getByMonth")
    public ResponseEntity<List<ChartsForBreakViewModel>> getDateAndTimePerMonth(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.dateAndTimePerMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getByYear")
    public ResponseEntity<List<ChartsForBreakViewModel>> getDateAndTimePerYear(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.dateAndTimePerYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getPreviousDate")
    public ResponseEntity<List<ChartsForBreakViewModel>> getPreviousDate(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getPreviousDate(search);
        return ResponseEntity.ok(chartsViewModelList);
    }


    @PostMapping("/getNextDate")
    public ResponseEntity<List<ChartsForBreakViewModel>> getNextDate(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getNextDate(search);
        return ResponseEntity.ok(chartsViewModelList);
    }


    @PostMapping("/getPreviousWeek")
    public ResponseEntity<List<ChartsForBreakViewModel>> getPreviousWeek(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getPreviousWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }


    @PostMapping("/getNextWeek")
    public ResponseEntity<List<ChartsForBreakViewModel>> getNextWeek(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getNextWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getPreviousMonth")
    public ResponseEntity<List<ChartsForBreakViewModel>> getPreviousMonth(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getPreviousMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getNextMonth")
    public ResponseEntity<List<ChartsForBreakViewModel>> getNextMonth(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getNextMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getPreviousYear")
    public ResponseEntity<List<ChartsForBreakViewModel>> getPreviousYear(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getPreviousYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getNextYear")
    public ResponseEntity<List<ChartsForBreakViewModel>> getNextYear(@RequestBody @Valid ChartsForBreakViewModel search) {
        List<ChartsForBreakViewModel> chartsViewModelList = this.chartsForBreakService.getNextYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }


}
