package domore.api.adapter;
import domore.api.model.CounterUpTimer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CounterUpTimerRepository extends JpaRepository<CounterUpTimer,Integer> {

    @Query(value = "SELECT DISTINCT EDUCATION_STAGE FROM COUNTER_UP_TIMER ", nativeQuery = true)
    Optional<List<String>> findAllEducationStageDistinct();

    @Query(value = "SELECT DISTINCT NAME  FROM COUNTER_UP_TIMER WHERE EDUCATION_STAGE = :educationStage ", nativeQuery = true)
    Optional<List<String>> findAllNameByEducationStageDistinct(String educationStage);

    @Query(value = "SELECT DISTINCT ACTUAL_YEAR FROM COUNTER_UP_TIMER " +
            "WHERE EDUCATION_STAGE = :educationStage AND NAME = :name", nativeQuery = true)
    Optional<List<Integer>> findAllActualYearByEducationStageAndNameDistinct(String educationStage, String name);

    @Query(value ="SELECT DISTINCT SUBJECT FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE= :educationStage" +
            "  AND NAME = :name ", nativeQuery = true)
    Optional<List<String>> findAllSubjectsByNameAndActualYearAndEducationStageDistinct(String educationStage, String name,int actualYear);


    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date%", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllByDate(String educationStage, String name,int actualYear,String date);

    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date% AND SUBJECT = :subject", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllBySubject(String educationStage, String name,int actualYear,String date,String subject);

    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date% AND START_TIME LIKE  %:startTime%", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllByStartTime(String educationStage, String name,int actualYear,String date,String startTime);

    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date% AND END_TIME LIKE  %:endTime%", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllByEndTime(String educationStage, String name,int actualYear,String date,String endTime);

    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date% AND SUBJECT = :subject AND START_TIME LIKE  %:startTime% AND END_TIME LIKE  %:endTime%", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllBySubjectAndStartTimeAndEndTime(String educationStage, String name,
                   int actualYear,String date,String subject,String startTime,String endTime);

    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date% AND SUBJECT = :subject AND START_TIME LIKE  %:startTime% ", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllBySubjectAndStartTime(String educationStage, String name,
                                                 int actualYear,String date,String subject,String startTime);

    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date% AND SUBJECT = :subject AND END_TIME LIKE  %:endTime%", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllBySubjectAndEndTime(String educationStage, String name,
                                           int actualYear,String date,String subject,String endTime);

    @Query(value ="SELECT * FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND " +
            "NAME = :name AND DATE LIKE :date% AND START_TIME LIKE  %:startTime%  AND END_TIME LIKE  %:endTime%", nativeQuery = true)
    Optional<List<CounterUpTimer>> findAllByStartTimeAndEndTime(String educationStage, String name,
                                                              int actualYear,String date,String startTime,String endTime);

    @Query(value ="SELECT SUM(HOURS) FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND \n" +
            " NAME = :name AND DATE LIKE :date%"  , nativeQuery = true)
    Optional<Integer> countHours(String educationStage, String name,int actualYear,String date);

    @Query(value ="SELECT SUM(MINUTES) FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND \n" +
            " NAME = :name AND DATE LIKE :date%", nativeQuery = true)
    Optional<Integer> countMinutes(String educationStage, String name,int actualYear,String date);

    @Query(value ="SELECT SUM(SECONDS) FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND \n" +
            " NAME = :name AND DATE LIKE :date%", nativeQuery = true)
    Optional<Integer> countSeconds(String educationStage, String name,int actualYear,String date);

    @Query(value ="SELECT SUM(HOURS) FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND \n" +
            " NAME = :name AND SUBJECT = :subject AND DATE LIKE :date%"  , nativeQuery = true)
    Optional<Integer> countHoursS(String educationStage, String name,int actualYear,String date, String subject);

    @Query(value ="SELECT SUM(MINUTES) FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND \n" +
            " NAME = :name AND SUBJECT = :subject AND DATE LIKE :date%", nativeQuery = true)
    Optional<Integer> countMinutesS(String educationStage, String name,int actualYear,String date,String subject);

    @Query(value ="SELECT SUM(SECONDS) FROM COUNTER_UP_TIMER WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE = :educationStage AND \n" +
            " NAME = :name AND SUBJECT = :subject AND DATE LIKE :date%", nativeQuery = true)
    Optional<Integer> countSecondsS(String educationStage, String name,int actualYear,String date,String subject);

}
