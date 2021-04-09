package domore.api.service;

import domore.api.adapter.EducationStageRepository;
import domore.api.model.EducationStage;
import domore.api.model.Subject;
import domore.api.model.viewModel.EducationStageViewModel;
import domore.api.model.viewModel.SubjectViewModel;
import org.springframework.stereotype.Component;

@Component
public class EducationStageAndSubjectService {

    private EducationStageRepository educationStageRepository;

    public EducationStageAndSubjectService(EducationStageRepository educationStageRepository) {
        this.educationStageRepository = educationStageRepository;
    }

    public EducationStage toEducationStage(EducationStageViewModel viewModel) {
        return new EducationStage(viewModel.getEducationStage(), viewModel.getName(), viewModel.getActualYear());
    }

    public Subject toSubject(SubjectViewModel subjectViewModel) {
        EducationStage eStage = educationStageRepository.findById(subjectViewModel.getEducationStageId()).get();
        return new Subject(subjectViewModel.getSubjectName(), eStage);
    }

    public EducationStageViewModel toEducationStageViewModel(EducationStage educationStage) {
        return new EducationStageViewModel(educationStage);
    }

    public SubjectViewModel toSubjectViewModel(Subject subject) {
        return new SubjectViewModel(subject);
    }

}
