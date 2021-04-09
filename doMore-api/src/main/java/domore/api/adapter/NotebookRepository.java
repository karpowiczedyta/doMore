package domore.api.adapter;

import domore.api.model.Notebook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotebookRepository extends JpaRepository<Notebook,Integer> {

    List<Notebook> findAllByName(String name);

}
