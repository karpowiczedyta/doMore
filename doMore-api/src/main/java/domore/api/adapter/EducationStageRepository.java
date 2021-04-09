package domore.api.adapter;

import domore.api.model.EducationStage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EducationStageRepository extends JpaRepository<EducationStage,Integer> {

    @Query(value = "SELECT DISTINCT EDUCATION_STAGE FROM EDUCATION_STAGE ", nativeQuery = true)
    Optional<List<String>> findAllDistinctEducationStage();

    @Query(value = "SELECT DISTINCT NAME  FROM EDUCATION_STAGE\n" +
            "WHERE EDUCATION_STAGE = :educationStage ", nativeQuery = true)
    Optional<List<String>> findAllNameByEducationStageDistinct(String educationStage);

    @Query(value = "SELECT DISTINCT ACTUAL_YEAR FROM EDUCATION_STAGE " +
            "WHERE EDUCATION_STAGE = :educationStage and NAME = :name", nativeQuery = true)
    Optional<List<Integer>> findAllActualYearByEducationStageAndNameDistinct(String educationStage, String name);

    @Query(value ="SELECT * FROM EDUCATION_STAGE WHERE ACTUAL_YEAR = :actualYear AND EDUCATION_STAGE= :educationStage" +
            "  AND NAME = :name ", nativeQuery = true)
    Optional<EducationStage> findByNameAndActualYearAndEducationStage(String educationStage, String name, int actualYear);

    }
