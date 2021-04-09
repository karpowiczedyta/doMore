package domore.api;

import domore.api.adapter.NoteRepository;
import domore.api.adapter.NotebookRepository;
import domore.api.model.Note;
import domore.api.model.Notebook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Warmup implements ApplicationListener<ContextRefreshedEvent> {

    public static final Logger logger = LoggerFactory.getLogger(Warmup.class);
    private NotebookRepository notebookRepository;
    private NoteRepository noteRepository;

    public Warmup(NotebookRepository notebookRepository, NoteRepository noteRepository) {
        this.notebookRepository = notebookRepository;
        this.noteRepository = noteRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        String name = "Default";

        List<Notebook> notebookList = notebookRepository.findAllByName(name);

        if (notebookList.size() == 0) {

            var defaultNotebook = new Notebook(name);
            this.notebookRepository.save(defaultNotebook);

            var note = new Note("Hello", "Welcome to your notebooks. ", defaultNotebook);
            this.noteRepository.save(note);

            logger.info("Added new notebook which is connected with some note");
        }

    }

}

