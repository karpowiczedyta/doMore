package domore.api.controller;

import domore.api.model.viewModel.ChartsViewModel;
import domore.api.model.viewModel.PieChartViewModel;
import domore.api.service.PieChartService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/pieChart")
@CrossOrigin
public class PieChartController {
    PieChartService pieChartService;

    public PieChartController(PieChartService pieChartService) {
        this.pieChartService = pieChartService;
    }

    @PostMapping("/getByDay")
    public ResponseEntity<List<Double>> getDateAndTimePerDay(@RequestBody @Valid ChartsViewModel search) {
        List<Double> newObj = this.pieChartService.dateAndTimePerThisDate(search);
        return ResponseEntity.ok(newObj);
    }

    @PostMapping("/getByWeek")
    public ResponseEntity<List<Double>> getDateAndTimePerWeek(@RequestBody @Valid ChartsViewModel search) {
        List<Double> chartsViewModelList = this.pieChartService.dateAndTimePerWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getByMonth")
    public ResponseEntity<List<Double>> getDateAndTimePerMonth(@RequestBody @Valid ChartsViewModel search) {
        List<Double> chartsViewModelList = this.pieChartService.dateAndTimePerMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getByYear")
    public ResponseEntity<List<Double>> getDateAndTimePerYear(@RequestBody @Valid ChartsViewModel search) {
        List<Double> chartsViewModelList = this.pieChartService.dateAndTimePerYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getPreviousDate")
    public ResponseEntity<PieChartViewModel> getPreviousDate(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getPreviousDate(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getNextDate")
    public ResponseEntity<PieChartViewModel> getNextDate(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getNextDate(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getPreviousWeek")
    public ResponseEntity<PieChartViewModel> getPreviousWeek(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getPreviousWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getNextWeek")
    public ResponseEntity<PieChartViewModel> getNextWeek(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getNextWeek(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getPreviousMonth")
    public ResponseEntity<PieChartViewModel> getPreviousMonth(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getPreviousMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getNextMonth")
    public ResponseEntity<PieChartViewModel> getNextMonth(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getNextMonth(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getPreviousYear")
    public ResponseEntity<PieChartViewModel> getPreviousYear(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getPreviousYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getNextYear")
    public ResponseEntity<PieChartViewModel> getNextYear(@RequestBody @Valid PieChartViewModel search) {
        PieChartViewModel chartsViewModelList = this.pieChartService.getNextYear(search);
        return ResponseEntity.ok(chartsViewModelList);
    }

    @PostMapping("/getDateByDay")
    public ResponseEntity<ChartsViewModel> getDateByDay(@RequestBody @Valid ChartsViewModel replace) {
        ChartsViewModel newDate = this.pieChartService.getRightDateP(replace);
        return ResponseEntity.ok(newDate);
    }

    @PostMapping("/getDateByWeek")
    public ResponseEntity<ChartsViewModel> getDateByWeek(@RequestBody @Valid ChartsViewModel replace) {
        ChartsViewModel newDate = this.pieChartService.getDateByWeek(replace);
        return ResponseEntity.ok(newDate);
    }

    @PostMapping("/getDateByMonth")
    public ResponseEntity<ChartsViewModel> getDateByMonth(@RequestBody @Valid ChartsViewModel replace) {
        ChartsViewModel newDate = this.pieChartService.getDateByMonth(replace);
        return ResponseEntity.ok(newDate);
    }

    @PostMapping("/getDateByYear")
    public ResponseEntity<ChartsViewModel> getDateByYear(@RequestBody @Valid ChartsViewModel replace) {
        ChartsViewModel newDate = this.pieChartService.getDateByYear(replace);
        return ResponseEntity.ok(newDate);
    }


}
