package domore.api.service;

import domore.api.model.Break;
import domore.api.model.CounterUpTimer;
import domore.api.model.viewModel.BreakViewModel;
import domore.api.model.viewModel.CounterUpTimerViewModel;
import org.springframework.stereotype.Component;

@Component
public class CounterUpTimerAndBreakService {

    public CounterUpTimer toCounterUpTimer(CounterUpTimerViewModel viewModel) {
        return new CounterUpTimer(
                viewModel.getEducationStage(),
                viewModel.getName(),
                viewModel.getActualYear(),
                viewModel.getSubject(),
                viewModel.getDate(),
                viewModel.getStartTime(),
                viewModel.getEndTime(),
                viewModel.getHours(),
                viewModel.getMinutes(),
                viewModel.getSeconds()
        );
    }

    public CounterUpTimerViewModel toCounterUpTimerViewModel(CounterUpTimer counterUpTimer) {
        return new CounterUpTimerViewModel(counterUpTimer);
    }

    public Break toBreak(BreakViewModel viewModel) {
        return new Break(
                viewModel.getDate(),
                viewModel.getStartTime(),
                viewModel.getEndTime(),
                viewModel.getHours(),
                viewModel.getMinutes(),
                viewModel.getSeconds()
        );
    }

    public BreakViewModel toBreakViewModel(Break breakk) {
        return new BreakViewModel(breakk);
    }


}
