package domore.api.service;

import domore.api.adapter.CounterUpTimerRepository;
import domore.api.model.viewModel.ChartsViewModel;
import domore.api.model.viewModel.PieChartViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class PieChartService {

    public static final Logger logger = LoggerFactory.getLogger(ChartsForSubjectService.class);
    CounterUpTimerRepository counterUpTimerRepository;


    public PieChartService(CounterUpTimerRepository counterUpTimerRepository) {
        this.counterUpTimerRepository = counterUpTimerRepository;
    }

    public static String getTime(int hours, int minutes) {
        String time = "";
        if (minutes < 10) {
            time = hours + ".0" + minutes;
        } else {
            time = hours + "." + minutes;
        }
        return time;
    }

    private static LocalDate returnMonday(LocalDate localDate) {
        String[] dayOfWeekARRAY = {"MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"};
        DayOfWeek dayOfWeek = localDate.getDayOfWeek();
        LocalDate monday = null;

        for (int i = 0; i < dayOfWeekARRAY.length; i++) {
            if (dayOfWeek.toString().equals(dayOfWeekARRAY[i].toString())) {
                monday = localDate.minusDays(i);
            }
        }
        System.out.println(dayOfWeek);
        System.out.println(monday);
        System.out.println(monday.plusDays(6));
        return monday;

    }

    public static List<LocalDate> getDateAllDaysOfWeek(LocalDate monday) {

        List<LocalDate> daysOfWeekList = new ArrayList<>();
        daysOfWeekList.add(monday);

        for (int i = 1; i < 7; i++) {
            LocalDate nextDay = monday.plusDays(i);
            daysOfWeekList.add(nextDay);
        }
        return daysOfWeekList;
    }

    public static String getRightMonth(String date) {
        System.out.println("date Right Month" + date);
        return date.substring(0, 8);
    }

    public static int getMonth(String date) {
        String substring = "";
        String substring1 = "";
        System.out.println("przed metodami getMonth- wyjatek ta funkcja: " + date);
        System.out.println("date " + date);
        if (date.length() == 9) {
            substring = date.substring(2, 4);
            System.out.println("subsetFor9: " + substring);
            if (substring.charAt(0) == '0') {
                substring1 = substring.substring(1, substring.length());
                System.out.println("valueOfFor9.1String " + substring1);
                System.out.println("valueOfFor9.1 " + Integer.valueOf(substring1));
                return Integer.valueOf(substring1);

            } else {
                substring1 = substring.substring(0, substring.length());
                System.out.println("valueOfFor9.2String " + substring1);
                System.out.println("valueOfFor9.2 " + Integer.valueOf(substring1));
                return Integer.valueOf(substring1);
            }

        } else {
            substring = date.substring(3, 5);
            System.out.println(substring);
            if (substring.charAt(0) == '0') {
                substring1 = substring.substring(1, substring.length());
                System.out.println("valueOfFor10.1 " + Integer.valueOf(substring1));
                return Integer.valueOf(substring1);
            } else {
                substring1 = substring.substring(0, substring.length());
                System.out.println("valueOfFor10.2 " + Integer.valueOf(substring1));
                return Integer.valueOf(substring1);
            }
        }

    }

    private static boolean isEven(int evenNumber) {
        return evenNumber % 2 == 0;
    }

    private static boolean isOdd(int oddNumber) {
        return oddNumber % 2 != 0;
    }

    private static boolean isLeapYear(int rok) {
        return ((rok % 4 == 0) && (rok % 100 != 0)) || (rok % 400 == 0);
    }

    private static int year(String date) {
        String year = date.substring(0, 4);
        System.out.println(year);
        return Integer.valueOf(year);
    }

    private static String yearS(String date) {
        return date.substring(0, 4);
    }

    private static String monthS(String date) {
        return date.substring(5, 7);
    }

    private static String day(String date) {
        return date.substring(8, date.length());
    }

    public static String getWithDot(PieChartViewModel search) {
        System.out.println("date with dot" + search.getDate());
        String dateToSearch = "";

        String year = search.getDate().substring(0, 4);
        String month = search.getDate().substring(5, 7);
        String day = search.getDate().substring(8, search.getDate().length());

        if (day.charAt(0) == '0') {
            day = day.substring(1, day.length());
        }

        dateToSearch = day + "." + month + "." + year;

        System.out.println("to change - on dot result" + dateToSearch);

        return dateToSearch;
    }

    public ChartsViewModel getRightDateP(ChartsViewModel search) {
        System.out.println("date" + search.getDate());
        String dateToSearch = "";
        if (search.getDate().length() == 9) {
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(5, newDate.length());
            String month = newDate.substring(1, 4);
            String day = newDate.substring(0, 1);
            dateToSearch = year + month + "-0" + day;
        } else {
            System.out.println("date" + search.getDate());
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(6, newDate.length());
            String month = newDate.substring(2, 5);
            String day = "-" + newDate.substring(0, 2);
            dateToSearch = year + month + day;
        }
        logger.info(search.getEducationStage());
        logger.info(search.getName());
        logger.info("" + search.getActualYear());
        logger.info("changed date: " + dateToSearch);
        search.setDate(dateToSearch);


        return search;
    }

    public String getRightDate(ChartsViewModel search) {
        System.out.println("date" + search.getDate());
        String dateToSearch = "";
        if (search.getDate().length() == 9) {
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(5, newDate.length());
            String month = newDate.substring(1, 4);
            String day = newDate.substring(0, 1);
            dateToSearch = year + month + "-0" + day;
        } else {
            System.out.println("date" + search.getDate());
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(6, newDate.length());
            String month = newDate.substring(2, 5);
            String day = "-" + newDate.substring(0, 2);
            dateToSearch = year + month + day;
        }
        logger.info(search.getEducationStage());
        logger.info(search.getName());
        logger.info("" + search.getActualYear());
        logger.info("changed date: " + dateToSearch);
        search.setDate(dateToSearch);


        return dateToSearch;
    }

    public String getRightDate(PieChartViewModel search) {
        System.out.println("date" + search.getDate());
        String dateToSearch = "";
        if (search.getDate().length() == 9) {
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(5, newDate.length());
            String month = newDate.substring(1, 4);
            String day = newDate.substring(0, 1);
            dateToSearch = year + month + "-0" + day;
        } else {
            System.out.println("date" + search.getDate());
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(6, newDate.length());
            String month = newDate.substring(2, 5);
            String day = "-" + newDate.substring(0, 2);
            dateToSearch = year + month + day;
        }
        logger.info(search.getEducationStage());
        logger.info(search.getName());
        logger.info("" + search.getActualYear());
        logger.info("changed date: " + dateToSearch);


        return dateToSearch;
    }

    public String getRightDatePie(ChartsViewModel search) {
        System.out.println("date" + search.getDate());
        String dateToSearch = "";
        if (search.getDate().length() == 9) {
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(5, newDate.length());
            String month = newDate.substring(1, 4);
            String day = newDate.substring(0, 1);
            dateToSearch = year + month + "-0" + day;
        } else {
            System.out.println("date" + search.getDate());
            String newDate = search.getDate().replace(".", "-");
            String year = newDate.substring(6, newDate.length());
            String month = newDate.substring(2, 5);
            String day = "-" + newDate.substring(0, 2);
            dateToSearch = year + month + day;
        }
        logger.info(search.getEducationStage());
        logger.info(search.getName());
        logger.info("" + search.getActualYear());
        logger.info("changed date: " + dateToSearch);

        return dateToSearch;
    }

    private List<String> getSubjects(ChartsViewModel search) {
        List<String> subjects;
        return subjects = this.counterUpTimerRepository
                .findAllSubjectsByNameAndActualYearAndEducationStageDistinct(search.getEducationStage(),
                        search.getName(), search.getActualYear()).get();
    }

    private List<String> getSubjects(PieChartViewModel search) {
        List<String> subjects;
        return subjects = this.counterUpTimerRepository
                .findAllSubjectsByNameAndActualYearAndEducationStageDistinct(search.getEducationStage(),
                        search.getName(), search.getActualYear()).get();
    }

    public String getMonthByDate(String date) {
        System.out.println("date Right Month" + date);
        return date.substring(0, 7);
    }

    public ChartsViewModel getDateByMonth(ChartsViewModel search) {
        String date = getRightDate(search);
        String month = getMonthByDate(date);
        search.setDate(month);
        return search;
    }

    public ChartsViewModel getDateByYear(ChartsViewModel search) {
        String date = getRightDate(search);
        String year = yearS(date);
        search.setDate(year);
        return search;
    }

    public List<Double> dateAndTimePerThisDate(ChartsViewModel search) {

        List<Double> timePerSubjectList = new ArrayList<>();

        List<String> subjects = getSubjects(search);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        String dateToSearch = getRightDate(search);

        for (int i = 0; i < subjects.size(); i++) {
            String subject = subjects.get(i);
            System.out.println(subject);
            Integer hours = this.counterUpTimerRepository
                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                    .orElse(0);
            Integer minutes = this.counterUpTimerRepository
                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                    .orElse(0);
            Integer seconds = this.counterUpTimerRepository
                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                    .orElse(0);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay); //assign too field time

            logger.info(time + "");
            logger.info(dateToSearch + "");

            timePerSubjectList.add(time);
        }

        return timePerSubjectList;
    }

    public ChartsViewModel getDateByWeek(ChartsViewModel search) {
        String dateS = "";
        String dateToSearch = getRightDate(search);
        LocalDate date = LocalDate.parse(dateToSearch);
        LocalDate monday = returnMonday(date);
        List<LocalDate> allDaysOfWeek = getDateAllDaysOfWeek(monday);

        for (int j = 0; j < 7; j++) {
            String dayOfWeek = allDaysOfWeek.get(j).toString();
            System.out.println(dayOfWeek);
            if (j == 0) {
                dateS = dayOfWeek + " - ";
            }
            if (j == 6) {
                dateS += dayOfWeek;
            }
        }
        search.setDate(dateS);
        return search;
    }

    public List<Double> dateAndTimePerWeek(ChartsViewModel search) {

        List<Double> timePerSubjectList = new ArrayList<>();

        List<String> subjects = getSubjects(search);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String dateToSearch = getRightDate(search);
        LocalDate date = LocalDate.parse(dateToSearch);
        LocalDate monday = returnMonday(date);
        List<LocalDate> allDaysOfWeek = getDateAllDaysOfWeek(monday);

        for (int j = 0; j < 7; j++) {
            String dayOfWeek = allDaysOfWeek.get(j).toString();
            System.out.println(dayOfWeek);
        }

        for (int i = 0; i < subjects.size(); i++) {
            for (int j = 0; j < 7; j++) {
                String dayOfWeek = allDaysOfWeek.get(j).toString();
                System.out.println(dayOfWeek);
                hours += this.counterUpTimerRepository
                        .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subjects.get(i))
                        .orElse(0);
                minutes += this.counterUpTimerRepository
                        .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subjects.get(i))
                        .orElse(0);
                seconds += this.counterUpTimerRepository
                        .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subjects.get(i))
                        .orElse(0);


                System.out.println(hours);
                System.out.println(minutes);
                System.out.println(seconds);

            }

            System.out.println("forSubject" + hours);
            System.out.println("forSubject" + minutes);
            System.out.println("forSubject" + seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timePerSubjectList.add(time);

            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        return timePerSubjectList;
    }

    public List<Double> dateAndTimePerMonth(ChartsViewModel search) {

        List<Double> timePerSubjectList = new ArrayList<>();

        List<String> subjects = getSubjects(search);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String date = getRightDatePie(search);
        String month = getRightMonth(date);
        System.out.println("Przed getMonth - wyjatek : " + date);
        System.out.println("Przed getMonth - wyjatek : " + month);

        int numberOfMonth = getMonth(search.getDate());

        String dateToSearch;

        for (int j = 0; j < subjects.size(); j++) {

            String subject = subjects.get(j);

            if (numberOfMonth == 2) {
                if (isLeapYear(year(date))) {
                    for (int i = 1; i <= 29; i++) {
                        if (i < 10) {
                            dateToSearch = month + "0" + i;
                            System.out.println(dateToSearch);

                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);

                        } else {
                            dateToSearch = month + i;
                            System.out.println(dateToSearch);

                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 28; i++) {
                        if (i < 10) {
                            dateToSearch = month + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = month + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }

            } else if (numberOfMonth <= 7) {

                if (isOdd(numberOfMonth)) {
                    for (int i = 1; i <= 31; i++) {
                        if (i < 10) {
                            dateToSearch = month + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = month + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 30; i++) {
                        if (i < 10) {
                            dateToSearch = month + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = month + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }

            } else {
                if (isEven(numberOfMonth)) {
                    for (int i = 1; i <= 31; i++) {
                        if (i < 10) {
                            dateToSearch = month + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = month + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 30; i++) {
                        if (i < 10) {
                            dateToSearch = month + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = month + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }
            }

            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timePerSubjectList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        return timePerSubjectList;
    }

    public List<Double> dateAndTimePerYear(ChartsViewModel search) {

        List<Double> timePerSubjectList = new ArrayList<>();

        List<String> subjects = getSubjects(search);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String dateToSearch;

        String date = getRightDate(search);
        String year = yearS(date);

        for (int j = 0; j < subjects.size(); j++) {
            String subject = subjects.get(j);
            for (int i = 1; i <= 12; i++) {
                if (i < 10) {
                    dateToSearch = year + "-0" + i;
                    System.out.println(dateToSearch);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                } else {
                    dateToSearch = year + "-" + i;
                    System.out.println(dateToSearch);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                }
            }
            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timePerSubjectList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        return timePerSubjectList;
    }

    public PieChartViewModel getPreviousDate(PieChartViewModel search) {
        int dayToSubstractNumberCheck = 0;
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();

        System.out.println("introduction" + search.getDate());
        String dateToSearch;
        String date;
        if (search.getDate().contains(".")) {
            date = getRightDate(search);
            System.out.println("END FUNCTION Reverse DATE : " + date);
        } else {
            String withDot = getWithDot(search);
            search.setDate(withDot);
            date = getRightDate(search);
            System.out.println("END FUNCTION Reverse DATE previous changed on dot : " + date);
        }

        String month = getRightMonth(date);
        System.out.println("END FUNCTION WIhout day with year and month and - -: " + month);

        int numberOfMonth = getMonth(search.getDate());
        System.out.println("END FUNCTION returned month number: " + numberOfMonth);

        String day = date.substring(8, date.length());
        System.out.println("END FUNCTION pull out DAY from date: " + day);

        String dayToSubstract;
        Integer dayToSubstractNumber = 0;


        if (day.charAt(0) == '0') {
            dayToSubstract = day.substring(1, day.length());
            dayToSubstractNumber = Integer.valueOf(dayToSubstract);
            System.out.println("I was 0:  " + dayToSubstract);
        } else {
            dayToSubstract = day.substring(0, day.length());
            dayToSubstractNumber = Integer.valueOf(dayToSubstract);
            System.out.println("I was NOT 0:  " + dayToSubstract);
        }

        for (int i = 0; i < subjects.size(); i++) {
            if (numberOfMonth == 1) {
                if (dayToSubstractNumber == 1) {
                    String year = yearS(date);
                    Integer yearI = Integer.valueOf(year);
                    yearI -= 1;
                    dateToSearch = yearI + "-12" + "-31";
                    String subject = subjects.get(i);
                    System.out.println(subject);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    search.setDate(dateToSearch);
                    dateList.add(dateToSearch);
                    search.setDateList(dateList);

                } else {
                    if (dayToSubstractNumberCheck == 0) {
                        dayToSubstractNumber -= 1;
                        dayToSubstractNumberCheck = 1;
                    }
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    }
                }
            } else if (numberOfMonth == 3) {
                if (isLeapYear(year(date))) {
                    if (dayToSubstractNumber == 1) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI -= 1;
                        dateToSearch = year + "-0" + monthI + "-29";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber -= 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                } else {
                    if (dayToSubstractNumber == 1) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI -= 1;
                        dateToSearch = year + "-0" + monthI + "-28";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber -= 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                }

            } else if (numberOfMonth == 8) {
                if (dayToSubstractNumber == 1) {
                    String year = yearS(date);
                    String month1 = monthS(date);
                    if (month1.charAt(0) == '0') {
                        month1 = month1.substring(1, month1.length());
                    }
                    Integer monthI = Integer.valueOf(month1);
                    monthI -= 1;
                    dateToSearch = year + "-0" + monthI + "-31";
                    String subject = subjects.get(i);
                    System.out.println(subject);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    search.setDate(dateToSearch);
                    dateList.add(dateToSearch);
                    search.setDateList(dateList);
                } else {
                    if (dayToSubstractNumberCheck == 0) {
                        dayToSubstractNumber -= 1;
                        dayToSubstractNumberCheck = 1;
                    }
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    }
                }
            } else if (numberOfMonth == 2) {


                if (dayToSubstractNumber == 1) {
                    String year = yearS(date);
                    dateToSearch = year + "-01-31";
                    String subject = subjects.get(i);
                    System.out.println(subject);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    search.setDate(dateToSearch);
                    dateList.add(dateToSearch);
                    search.setDateList(dateList);
                } else {
                    if (dayToSubstractNumberCheck == 0) {
                        dayToSubstractNumber -= 1;
                        dayToSubstractNumberCheck = 1;
                    }
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    }

                }
            } else if (numberOfMonth <= 7) {

                if (isOdd(numberOfMonth)) {
                    if (dayToSubstractNumber == 1) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI -= 1;
                        dateToSearch = year + "-0" + monthI + "-30";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber -= 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                } else {
                    if (dayToSubstractNumber == 1) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI -= 1;
                        dateToSearch = year + "-0" + monthI + "-31";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber -= 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                }
            } else {
                if (isOdd(numberOfMonth)) {
                    if (dayToSubstractNumber == 1) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI -= 1;
                        if (monthI < 10) {
                            dateToSearch = year + "-0" + monthI + "-31";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = year + "-" + monthI + "-31";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }

                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber -= 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                } else {
                    if (dayToSubstractNumber == 1) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI -= 1;
                        if (monthI < 10) {
                            dateToSearch = year + "-0" + monthI + "-30";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = year + "-" + monthI + "-30";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }

                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber -= 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                }
            }

            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        search.setTimeList(timeList);
        return search;
    }

    public PieChartViewModel getNextDate(PieChartViewModel search) {
        int dayToSubstractNumberCheck = 0;
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();

        System.out.println("introduction" + search.getDate());
        String dateToSearch;
        String date;
        if (search.getDate().contains(".")) {
            date = getRightDate(search);
            System.out.println("END FUNCTION Reverse DATE : " + date);
        } else {
            String withDot = getWithDot(search);
            search.setDate(withDot);
            date = getRightDate(search);
            System.out.println("END FUNCTION Reverse DATE previous changed on dot : " + date);
        }

        String month = getRightMonth(date);
        System.out.println("END FUNCTION WIhout day with year and month and - -: " + month);

        int numberOfMonth = getMonth(search.getDate());
        System.out.println("END FUNCTION returned month number: " + numberOfMonth);

        String day = date.substring(8, date.length());
        System.out.println("END FUNCTION pull out DAY from date: " + day);

        String dayToSubstract;
        Integer dayToSubstractNumber = 0;


        if (day.charAt(0) == '0') {
            dayToSubstract = day.substring(1, day.length());
            dayToSubstractNumber = Integer.valueOf(dayToSubstract);
            System.out.println("I was 0:  " + dayToSubstract);
        } else {
            dayToSubstract = day.substring(0, day.length());
            dayToSubstractNumber = Integer.valueOf(dayToSubstract);
            System.out.println("I was NOT 0:  " + dayToSubstract);
        }

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
            if (numberOfMonth == 12) {
                if (dayToSubstractNumber == 31) {
                    String year = yearS(date);
                    Integer yearI = Integer.valueOf(year);
                    yearI += 1;
                    dateToSearch = yearI + "-01" + "-01";
                    String subject = subjects.get(i);
                    System.out.println(subject);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    search.setDate(dateToSearch);
                    dateList.add(dateToSearch);
                    search.setDateList(dateList);
                } else {
                    if (dayToSubstractNumberCheck == 0) {
                        dayToSubstractNumber += 1;
                        dayToSubstractNumberCheck = 1;
                    }
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    }
                }
            } else if (numberOfMonth == 1) {
                if (isLeapYear(year(date))) {
                    if (dayToSubstractNumber == 31) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI += 1;
                        dateToSearch = year + "-0" + monthI + "-29";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber += 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                } else {
                    if (dayToSubstractNumber == 31) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI += 1;
                        dateToSearch = year + "-0" + monthI + "-28";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber += 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                }

            } else if (numberOfMonth == 7) {
                if (dayToSubstractNumber == 31) {
                    String year = yearS(date);
                    String month1 = monthS(date);
                    if (month1.charAt(0) == '0') {
                        month1 = month1.substring(1, month1.length());
                    }
                    Integer monthI = Integer.valueOf(month1);
                    monthI += 1;
                    dateToSearch = year + "-0" + monthI + "-01";
                    String subject = subjects.get(i);
                    System.out.println(subject);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    search.setDate(dateToSearch);
                    dateList.add(dateToSearch);
                    search.setDateList(dateList);
                } else {
                    if (dayToSubstractNumberCheck == 0) {
                        dayToSubstractNumber += 1;
                        dayToSubstractNumberCheck = 1;
                    }
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    }
                }
            } else if (numberOfMonth == 2) {


                if (dayToSubstractNumber == 28 | dayToSubstractNumber == 29) {
                    String year = yearS(date);
                    dateToSearch = year + "-03-01";
                    String subject = subjects.get(i);
                    System.out.println(subject);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    search.setDate(dateToSearch);
                    dateList.add(dateToSearch);
                    search.setDateList(dateList);
                } else {
                    if (dayToSubstractNumberCheck == 0) {
                        dayToSubstractNumber += 1;
                        dayToSubstractNumberCheck = 1;
                    }
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    }

                }
            } else if (numberOfMonth <= 7) {

                if (isOdd(numberOfMonth)) {
                    if (dayToSubstractNumber == 31) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI += 1;
                        dateToSearch = year + "-0" + monthI + "-01";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber += 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                } else {
                    if (dayToSubstractNumber == 30) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI += 1;
                        dateToSearch = year + "-0" + monthI + "-01";
                        String subject = subjects.get(i);
                        System.out.println(subject);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        search.setDate(dateToSearch);
                        dateList.add(dateToSearch);
                        search.setDateList(dateList);
                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber += 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                }
            } else {
                if (isOdd(numberOfMonth)) {
                    if (dayToSubstractNumber == 30) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI += 1;
                        if (monthI < 10) {
                            dateToSearch = year + "-0" + monthI + "-01";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = year + "-" + monthI + "-01";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }

                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber += 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                } else {
                    if (dayToSubstractNumber == 31) {
                        String year = yearS(date);
                        String month1 = monthS(date);
                        if (month1.charAt(0) == '0') {
                            month1 = month1.substring(1, month1.length());
                        }
                        Integer monthI = Integer.valueOf(month1);
                        monthI += 1;
                        if (monthI < 10) {
                            dateToSearch = year + "-0" + monthI + "-01";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = year + "-" + monthI + "-01";
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }

                    } else {
                        if (dayToSubstractNumberCheck == 0) {
                            dayToSubstractNumber += 1;
                            dayToSubstractNumberCheck = 1;
                        }
                        String year = yearS(date);
                        if (dayToSubstractNumber < 10) {
                            dateToSearch = month + "0" + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        } else {
                            dateToSearch = month + dayToSubstractNumber;
                            String subject = subjects.get(i);
                            System.out.println(subject);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            search.setDate(dateToSearch);
                            dateList.add(dateToSearch);
                            search.setDateList(dateList);
                        }
                    }
                }
            }

            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        search.setTimeList(timeList);
        return search;
    }

    public PieChartViewModel getPreviousWeek(PieChartViewModel search) {
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;
        String dateToSearch = "";
        LocalDate date = null;
        String dateS = "";

        if (search.getDate().contains(".")) {
            dateToSearch = getRightDate(search);
            date = LocalDate.parse(dateToSearch);
        } else {
            dateToSearch = search.getDate();
            date = LocalDate.parse(dateToSearch);
        }

        LocalDate monday = returnMonday(date);
        LocalDate previousMonday = monday.minusDays(7);
        List<LocalDate> allDaysOfWeek = getDateAllDaysOfWeek(previousMonday);

        for (int j = 0; j < 7; j++) {
            search.setDate(allDaysOfWeek.get(0).toString());
            String dayOfWeek = allDaysOfWeek.get(j).toString();
            System.out.println(dayOfWeek);
            if (j == 0) {
                dateS = dayOfWeek + " - ";
            }
            if (j == 6) {
                dateS += dayOfWeek;
            }
        }
        dateList.add(dateS);
        search.setDateList(dateList);

        for (int j = 0; j < subjects.size(); j++) {
            String subject = subjects.get(j);
            for (int i = 0; i < 7; i++) {
                String dayOfWeek = allDaysOfWeek.get(i).toString();
                System.out.println(dayOfWeek);
                hours += this.counterUpTimerRepository
                        .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subject)
                        .orElse(0);
                minutes += this.counterUpTimerRepository
                        .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subject)
                        .orElse(0);
                seconds += this.counterUpTimerRepository
                        .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subject)
                        .orElse(0);

            }
            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        search.setTimeList(timeList);
        return search;
    }

    public PieChartViewModel getNextWeek(PieChartViewModel search) {
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;
        String dateToSearch = "";
        LocalDate date = null;
        String dateS = "";

        if (search.getDate().contains(".")) {
            dateToSearch = getRightDate(search);
            date = LocalDate.parse(dateToSearch);
        } else {
            dateToSearch = search.getDate();
            date = LocalDate.parse(dateToSearch);
        }

        LocalDate monday = returnMonday(date);
        LocalDate previousMonday = monday.plusDays(7);
        List<LocalDate> allDaysOfWeek = getDateAllDaysOfWeek(previousMonday);

        for (int j = 0; j < 7; j++) {
            search.setDate(allDaysOfWeek.get(0).toString());
            String dayOfWeek = allDaysOfWeek.get(j).toString();
            System.out.println(dayOfWeek);
            if (j == 0) {
                dateS = dayOfWeek + " - ";
            }
            if (j == 6) {
                dateS += dayOfWeek;
            }
        }
        dateList.add(dateS);
        search.setDateList(dateList);

        for (int j = 0; j < subjects.size(); j++) {
            String subject = subjects.get(j);
            for (int i = 0; i < 7; i++) {
                String dayOfWeek = allDaysOfWeek.get(i).toString();
                System.out.println(dayOfWeek);
                hours += this.counterUpTimerRepository
                        .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subject)
                        .orElse(0);
                minutes += this.counterUpTimerRepository
                        .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subject)
                        .orElse(0);
                seconds += this.counterUpTimerRepository
                        .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, subject)
                        .orElse(0);

            }
            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        search.setTimeList(timeList);
        return search;
    }

    public PieChartViewModel getPreviousMonth(PieChartViewModel search) {
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();
        int ifFirstTransition = 0;
        int ifFirstTransitionY = 0;
        int isJanuary = 0;

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String date;
        String dateToSearch;

        if (search.getDate().contains(".")) {
            date = getRightDate(search);
        } else {
            String withDot = getWithDot(search);
            search.setDate(withDot);
            date = getRightDate(search);
            System.out.println("END FUNCTION Reverse DATE previous changed on dot : " + date);
        }

        String yearTmp = yearS(date);
        String monthTmp = "";

        int numberOfMonth = getMonth(search.getDate());

        for (int j = 0; j < subjects.size(); j++) {
            String subject = subjects.get(j);

            if (numberOfMonth == 1 && ifFirstTransition == 0) {
                isJanuary = 1;
                System.out.println("jestem styczen");
                monthTmp = String.valueOf(12);
                numberOfMonth = 12;
                System.out.println("nr miesiaca: " + monthTmp);
                if (ifFirstTransitionY == 0) {
                    Integer yearTmpI = Integer.valueOf(yearTmp);
                    yearTmp = String.valueOf(yearTmpI - 1);
                    ifFirstTransitionY = 1;
                }
                System.out.println("numer roku" + yearTmp);
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                    }

                }
            } else {
                if (ifFirstTransition == 0 && isJanuary != 1) {
                    numberOfMonth -= 1;
                    ifFirstTransition = 1;
                }
            }


            if (numberOfMonth < 10) {
                monthTmp = "0" + numberOfMonth;
            } else {
                monthTmp = String.valueOf(numberOfMonth);
            }


            if (numberOfMonth == 2) {
                if (isLeapYear(year(date))) {
                    for (int i = 1; i <= 29; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 28; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }

            } else if (numberOfMonth <= 7) {

                if (isOdd(numberOfMonth)) {
                    for (int i = 1; i <= 31; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 30; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }

            } else {
                if (isEven(numberOfMonth)) {
                    for (int i = 1; i <= 31; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 30; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }
            }
            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        search.setDate(yearTmp + "-" + monthTmp + "-01");
        dateList.add(yearTmp + "-" + monthTmp);
        search.setDateList(dateList);
        search.setTimeList(timeList);
        return search;
    }

    public PieChartViewModel getNextMonth(PieChartViewModel search) {
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();
        int ifFirstTransition = 0;
        int ifFirstTransitionY = 0;
        int isJanuary = 0;

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String date;
        String dateToSearch;

        if (search.getDate().contains(".")) {
            date = getRightDate(search);
        } else {
            String withDot = getWithDot(search);
            search.setDate(withDot);
            date = getRightDate(search);
            System.out.println("END FUNCTION Reverse DATE previous changed on dot : " + date);
        }

        String yearTmp = yearS(date);
        String monthTmp = "";

        int numberOfMonth = getMonth(search.getDate());

        for (int j = 0; j < subjects.size(); j++) {
            String subject = subjects.get(j);


            if (numberOfMonth == 12 && ifFirstTransition == 0) {
                isJanuary = 1;
                System.out.println("jestem styczen");
                monthTmp = String.valueOf(1);
                numberOfMonth = 1;
                System.out.println("nr miesiaca: " + monthTmp);
                if (ifFirstTransitionY == 0) {
                    Integer yearTmpI = Integer.valueOf(yearTmp);
                    yearTmp = String.valueOf(yearTmpI + 1);
                    ifFirstTransitionY = 1;
                }
                System.out.println("numer roku" + yearTmp);
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-0" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                    } else {
                        dateToSearch = yearTmp + "-0" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        hours += this.counterUpTimerRepository
                                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        minutes += this.counterUpTimerRepository
                                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                        seconds += this.counterUpTimerRepository
                                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                .orElse(0);
                    }

                }
            } else {
                if (ifFirstTransition == 0 && isJanuary != 1) {
                    numberOfMonth += 1;
                    ifFirstTransition = 1;
                }
            }


            if (numberOfMonth < 10) {
                monthTmp = "0" + numberOfMonth;
            } else {
                monthTmp = String.valueOf(numberOfMonth);
            }


            if (numberOfMonth == 2) {
                if (isLeapYear(year(date))) {
                    for (int i = 1; i <= 29; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 28; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }

            } else if (numberOfMonth <= 7) {

                if (isOdd(numberOfMonth)) {
                    for (int i = 1; i <= 31; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 30; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }

            } else {
                if (isEven(numberOfMonth)) {
                    for (int i = 1; i <= 31; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                } else {
                    for (int i = 1; i <= 30; i++) {
                        if (i < 10) {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        } else {
                            dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                            System.out.println(dateToSearch);
                            hours += this.counterUpTimerRepository
                                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            minutes += this.counterUpTimerRepository
                                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                            seconds += this.counterUpTimerRepository
                                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                                    .orElse(0);
                        }

                    }
                }
            }
            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        search.setDate(yearTmp + "-" + monthTmp + "-01");
        dateList.add(yearTmp + "-" + monthTmp);
        search.setDateList(dateList);
        search.setTimeList(timeList);
        return search;
    }

    public PieChartViewModel getPreviousYear(PieChartViewModel search) {
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String date = "";
        String dateToSearch = "";
        if (search.getDate().contains(".")) {
            date = getRightDate(search);

        } else {
            date = search.getDate();
        }


        String year = yearS(date);
        Integer yearI = Integer.valueOf(year);
        year = String.valueOf(yearI - 1);

        dateList.add(year);
        search.setDateList(dateList);

        search.setDate(year + "-01-01");

        for (int j = 0; j < subjects.size(); j++) {
            String subject = subjects.get(j);
            for (int i = 1; i <= 12; i++) {
                if (i < 10) {
                    dateToSearch = year + "-0" + i;
                    System.out.println(dateToSearch);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                } else {
                    dateToSearch = year + "-" + i;
                    System.out.println(dateToSearch);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                }
            }
            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        search.setTimeList(timeList);
        return search;

    }

    public PieChartViewModel getNextYear(PieChartViewModel search) {
        List<String> subjects = getSubjects(search);
        search.setSubjectList(subjects);

        for (int i = 0; i < subjects.size(); i++) {
            System.out.println(subjects.get(i));
        }

        List<String> dateList = new ArrayList<>();
        List<Double> timeList = new ArrayList<>();

        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String date = "";
        String dateToSearch = "";
        if (search.getDate().contains(".")) {
            date = getRightDate(search);

        } else {
            date = search.getDate();
        }


        String year = yearS(date);
        Integer yearI = Integer.valueOf(year);
        year = String.valueOf(yearI + 1);

        dateList.add(year);
        search.setDateList(dateList);

        search.setDate(year + "-01-01");

        for (int j = 0; j < subjects.size(); j++) {
            String subject = subjects.get(j);
            for (int i = 1; i <= 12; i++) {
                if (i < 10) {
                    dateToSearch = year + "-0" + i;
                    System.out.println(dateToSearch);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                } else {
                    dateToSearch = year + "-" + i;
                    System.out.println(dateToSearch);
                    hours += this.counterUpTimerRepository
                            .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    minutes += this.counterUpTimerRepository
                            .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                    seconds += this.counterUpTimerRepository
                            .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, subject)
                            .orElse(0);
                }
            }
            System.out.println(hours);
            System.out.println(minutes);
            System.out.println(seconds);

            minutes += seconds / 60;
            seconds = seconds % 60;
            hours += minutes / 60;
            minutes = minutes % 60;

            String timeByDay = getTime(hours, minutes);
            double time = Double.parseDouble(timeByDay);
            System.out.println(time);
            timeList.add(time);
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        search.setTimeList(timeList);
        return search;
    }

}
