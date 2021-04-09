package domore.api.adapter;

import domore.api.model.Break;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface BreakRepository extends JpaRepository<Break, Integer> {

    @Query(value = "SELECT SUM(HOURS) FROM BREAK WHERE DATE LIKE :date%", nativeQuery = true)
    Optional<Integer> countHours(String date);

    @Query(value = "SELECT SUM(MINUTES) FROM BREAK WHERE DATE LIKE :date%", nativeQuery = true)
    Optional<Integer> countMinutes(String date);

    @Query(value = "SELECT SUM(SECONDS) FROM BREAK WHERE DATE LIKE :date%", nativeQuery = true)
    Optional<Integer> countSeconds(String date);

}
