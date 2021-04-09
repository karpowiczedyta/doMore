package domore.api.service;

import domore.api.adapter.BreakRepository;
import domore.api.adapter.CounterUpTimerRepository;
import domore.api.model.Charts;
import domore.api.model.viewModel.ChartsViewModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class ChartsForSubjectService {
    public static final Logger logger = LoggerFactory.getLogger(ChartsForSubjectService.class);
    CounterUpTimerRepository counterUpTimerRepository;
    BreakRepository breakRepository;

    public ChartsForSubjectService(CounterUpTimerRepository counterUpTimerRepository, BreakRepository breakRepository) {
        this.counterUpTimerRepository = counterUpTimerRepository;
        this.breakRepository = breakRepository;
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

    public static String getTime(int hours, int minutes) {
        String time = "";
        if (minutes < 10) {
            time = hours + ".0" + minutes;
        } else {
            time = hours + "." + minutes;
        }
        return time;
    }

    public static String getRightDate(ChartsViewModel search) {
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
        logger.info(dateToSearch);

        return dateToSearch;
    }


    public static String getWithDot(ChartsViewModel search) {
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

    public static String getWithDotYM(ChartsViewModel search) {
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

    public static String getRightMonth(String date) {
        System.out.println("date Right Month" + date);
        return date.substring(0, 8);
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

    public static int getMonth(String date) {
        String substring = "";
        String substring1 = "";

        System.out.println("date " + date);
        if (date.length() == 9) {
            substring = date.substring(2, 4);
            System.out.println("subsetFor9: " + substring);
            if (substring.charAt(0) == '0') {
                substring1 = substring.substring(1, substring.length());
                System.out.println("valueOfFor9.1 " + Integer.valueOf(substring1));
                return Integer.valueOf(substring1);

            } else {
                substring1 = substring.substring(0, substring.length());
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


    public Charts toChart(ChartsViewModel viewModel) {
        return new Charts(
                viewModel.getEducationStage(),
                viewModel.getName(),
                viewModel.getActualYear(),
                viewModel.getSubject(),
                viewModel.getDate(),
                viewModel.getTime()

        );
    }

    public ChartsViewModel toChartViewModel(Charts charts) {
        return new ChartsViewModel(charts);
    }


    public List<ChartsViewModel> dateAndTimePerYear(ChartsViewModel search) {

        List<ChartsViewModel> timePerIndividualsMonth = new ArrayList<>();
        String dateToSearch;

        String date = getRightDate(search);
        String year = yearS(date);

        for (int i = 1; i <= 12; i++) {
            if (i < 10) {
                dateToSearch = year + "-0" + i;
                System.out.println(dateToSearch);
                timePerIndividualsMonth = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsMonth);
            } else {
                dateToSearch = year + "-" + i;
                System.out.println(dateToSearch);
                timePerIndividualsMonth = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsMonth);
            }
        }
        return timePerIndividualsMonth;
    }

    public List<ChartsViewModel> dateAndTimePerMonth(ChartsViewModel search) {
        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();

        String date = getRightDate(search);
        String month = getRightMonth(date);
        int numberOfMonth = getMonth(search.getDate());

        String dateToSearch;
        if (numberOfMonth == 2) {
            if (isLeapYear(year(date))) {
                for (int i = 1; i <= 29; i++) {
                    if (i < 10) {
                        dateToSearch = month + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 28; i++) {
                    if (i < 10) {
                        dateToSearch = month + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }

        } else if (numberOfMonth <= 7) {

            if (isOdd(numberOfMonth)) {
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = month + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 30; i++) {
                    if (i < 10) {
                        dateToSearch = month + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }

        } else {
            if (isEven(numberOfMonth)) {
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = month + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 30; i++) {
                    if (i < 10) {
                        dateToSearch = month + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }
        }

        return timePerIndividualsDays;

    }

    public List<ChartsViewModel> dateAndTimePerWeek(ChartsViewModel search) {

        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();
        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        String dateToSearch = getRightDate(search);
        LocalDate date = LocalDate.parse(dateToSearch);
        LocalDate monday = returnMonday(date);
        List<LocalDate> allDaysOfWeek = getDateAllDaysOfWeek(monday);


        for (int i = 0; i < 7; i++) {
            String dayOfWeek = allDaysOfWeek.get(i).toString();
            System.out.println(dayOfWeek);
            hours = this.counterUpTimerRepository
                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);
            minutes = this.counterUpTimerRepository
                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);
            seconds = this.counterUpTimerRepository
                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);


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
            timePerIndividualsDays.add(new ChartsViewModel(search, time, dayOfWeek));
        }

        return timePerIndividualsDays;

    }

    public ChartsViewModel dateAndTimePerThisDate(ChartsViewModel search) {

        String dateToSearch = getRightDate(search);

        Integer hours = this.counterUpTimerRepository
                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, search.getSubject())
                .orElse(0);
        Integer minutes = this.counterUpTimerRepository
                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, search.getSubject())
                .orElse(0);
        Integer seconds = this.counterUpTimerRepository
                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, search.getSubject())
                .orElse(0);

        minutes += seconds / 60;
        seconds = seconds % 60;
        hours += minutes / 60;
        minutes = minutes % 60;

        String timeByDay = getTime(hours, minutes);
        double time = Double.parseDouble(timeByDay);

        logger.info(time + "");
        logger.info(dateToSearch + "");

        return new ChartsViewModel(search, time, dateToSearch);
    }

    private List<ChartsViewModel> getTimeAndDateFromDB(ChartsViewModel search, String dateToSearch, List<ChartsViewModel>
            timePerIndividualsDays) {
        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;

        hours = this.counterUpTimerRepository
                .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, search.getSubject())
                .orElse(0);
        minutes = this.counterUpTimerRepository
                .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, search.getSubject())
                .orElse(0);
        seconds = this.counterUpTimerRepository
                .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dateToSearch, search.getSubject())
                .orElse(0);


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
        timePerIndividualsDays.add(new ChartsViewModel(search, time, dateToSearch));

        return timePerIndividualsDays;
    }

    public List<ChartsViewModel> getPreviousDate(ChartsViewModel search) {
        System.out.println("introduction" + search.getDate());
        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();
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

        if (numberOfMonth == 1) {
            if (dayToSubstractNumber == 1) {
                String year = yearS(date);
                Integer yearI = Integer.valueOf(year);
                yearI -= 1;
                dateToSearch = yearI + "-12" + "-31";
                timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
            } else {
                dayToSubstractNumber -= 1;
                String year = yearS(date);
                if (dayToSubstractNumber < 10) {
                    dateToSearch = month + "0" + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = month + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber -= 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber -= 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
            } else {
                dayToSubstractNumber -= 1;
                String year = yearS(date);
                if (dayToSubstractNumber < 10) {
                    dateToSearch = month + "0" + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = month + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                }
            }
        } else if (numberOfMonth == 2) {


            if (dayToSubstractNumber == 1) {
                String year = yearS(date);
                dateToSearch = year + "-01-31";
                timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
            } else {
                dayToSubstractNumber -= 1;
                String year = yearS(date);
                if (dayToSubstractNumber < 10) {
                    dateToSearch = month + "0" + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = month + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber -= 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber -= 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = year + "-" + monthI + "-31";
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                } else {
                    dayToSubstractNumber -= 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = year + "-" + monthI + "-30";
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                } else {
                    dayToSubstractNumber -= 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }
                }
            }
        }
        return timePerIndividualsDays;
    }

    public List<ChartsViewModel> getPreviousWeek(ChartsViewModel search) {
        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();
        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;
        String dateToSearch = "";
        LocalDate date = null;

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


        for (int i = 0; i < 7; i++) {
            String dayOfWeek = allDaysOfWeek.get(i).toString();
            System.out.println(dayOfWeek);
            hours = this.counterUpTimerRepository
                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);
            minutes = this.counterUpTimerRepository
                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);
            seconds = this.counterUpTimerRepository
                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);


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
            timePerIndividualsDays.add(new ChartsViewModel(search, time, dayOfWeek));
        }

        return timePerIndividualsDays;

    }

    public List<ChartsViewModel> getPreviousMonth(ChartsViewModel search) {

        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();
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
        String monthTmp;

        int numberOfMonth = getMonth(search.getDate());

        if (numberOfMonth == 1) {
            System.out.println("jestem styczen");
            monthTmp = String.valueOf(12);
            System.out.println("nr miesiaca: " + monthTmp);
            Integer yearTmpI = Integer.valueOf(yearTmp);
            yearTmp = String.valueOf(yearTmpI - 1);
            System.out.println("numer roku" + yearTmp);
            for (int i = 1; i <= 31; i++) {
                if (i < 10) {
                    dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                    System.out.println(dateToSearch);
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                    System.out.println(dateToSearch);
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                }

            }
        } else {
            numberOfMonth -= 1;
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
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 28; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }

        } else if (numberOfMonth <= 7) {

            if (isOdd(numberOfMonth)) {
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 30; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }

        } else {
            if (isEven(numberOfMonth)) {
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 30; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }
        }

        return timePerIndividualsDays;

    }


    public List<ChartsViewModel> getPreviousYear(ChartsViewModel search) {

        List<ChartsViewModel> timePerIndividualsMonth = new ArrayList<>();
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

        for (int i = 1; i <= 12; i++) {
            if (i < 10) {
                dateToSearch = year + "-0" + i;
                System.out.println(dateToSearch);
                timePerIndividualsMonth = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsMonth);
            } else {
                dateToSearch = year + "-" + i;
                System.out.println(dateToSearch);
                timePerIndividualsMonth = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsMonth);
            }
        }
        return timePerIndividualsMonth;
    }

    public List<ChartsViewModel> getNextDate(ChartsViewModel search) {
        System.out.println("introduction" + search.getDate());
        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();
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

        if (numberOfMonth == 12) {
            if (dayToSubstractNumber == 31) {
                String year = yearS(date);
                Integer yearI = Integer.valueOf(year);
                yearI += 1;
                dateToSearch = yearI + "-01" + "-01";
                timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
            } else {
                dayToSubstractNumber += 1;
                String year = yearS(date);
                if (dayToSubstractNumber < 10) {
                    dateToSearch = month + "0" + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = month + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber += 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber += 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
            } else {
                dayToSubstractNumber += 1;
                String year = yearS(date);
                if (dayToSubstractNumber < 10) {
                    dateToSearch = month + "0" + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = month + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                }
            }
        } else if (numberOfMonth == 2) {


            if (dayToSubstractNumber == 28 | dayToSubstractNumber == 29) {
                String year = yearS(date);
                dateToSearch = year + "-03-01";
                timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
            } else {
                dayToSubstractNumber += 1;
                String year = yearS(date);
                if (dayToSubstractNumber < 10) {
                    dateToSearch = month + "0" + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = month + dayToSubstractNumber;
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber += 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dayToSubstractNumber += 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = year + "-" + monthI + "-01";
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                } else {
                    dayToSubstractNumber += 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
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
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = year + "-" + monthI + "-01";
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                } else {
                    dayToSubstractNumber += 1;
                    String year = yearS(date);
                    if (dayToSubstractNumber < 10) {
                        dateToSearch = month + "0" + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = month + dayToSubstractNumber;
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }
                }
            }
        }
        return timePerIndividualsDays;
    }

    public List<ChartsViewModel> getNextWeek(ChartsViewModel search) {
        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();
        Integer hours = 0;
        Integer minutes = 0;
        Integer seconds = 0;
        String dateToSearch = "";
        LocalDate date = null;

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


        for (int i = 0; i < 7; i++) {
            String dayOfWeek = allDaysOfWeek.get(i).toString();
            System.out.println(dayOfWeek);
            hours = this.counterUpTimerRepository
                    .countHoursS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);
            minutes = this.counterUpTimerRepository
                    .countMinutesS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);
            seconds = this.counterUpTimerRepository
                    .countSecondsS(search.getEducationStage(), search.getName(), search.getActualYear(), dayOfWeek, search.getSubject())
                    .orElse(0);


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
            timePerIndividualsDays.add(new ChartsViewModel(search, time, dayOfWeek));
        }

        return timePerIndividualsDays;

    }

    public List<ChartsViewModel> getNextMonth(ChartsViewModel search) {

        List<ChartsViewModel> timePerIndividualsDays = new ArrayList<>();
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
        String monthTmp;

        int numberOfMonth = getMonth(search.getDate());

        if (numberOfMonth == 12) {
            System.out.println("jestem styczen");
            monthTmp = "01";
            System.out.println("nr miesiaca: " + monthTmp);
            Integer yearTmpI = Integer.valueOf(yearTmp);
            yearTmp = String.valueOf(yearTmpI + 1);
            System.out.println("numer roku" + yearTmp);
            for (int i = 1; i <= 31; i++) {
                if (i < 10) {
                    dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                    System.out.println(dateToSearch);
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                } else {
                    dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                    System.out.println(dateToSearch);
                    timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                }

            }
        } else {
            numberOfMonth += 1;
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
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 28; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }

        } else if (numberOfMonth <= 7) {

            if (isOdd(numberOfMonth)) {
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 30; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }

        } else {
            if (isEven(numberOfMonth)) {
                for (int i = 1; i <= 31; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            } else {
                for (int i = 1; i <= 30; i++) {
                    if (i < 10) {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + "0" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    } else {
                        dateToSearch = yearTmp + "-" + monthTmp + "-" + i;
                        System.out.println(dateToSearch);
                        timePerIndividualsDays = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsDays);
                    }

                }
            }
        }

        return timePerIndividualsDays;

    }


    public List<ChartsViewModel> getNextYear(ChartsViewModel search) {
        List<ChartsViewModel> timePerIndividualsMonth = new ArrayList<>();
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

        for (int i = 1; i <= 12; i++) {
            if (i < 10) {
                dateToSearch = year + "-0" + i;
                System.out.println(dateToSearch);
                timePerIndividualsMonth = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsMonth);
            } else {
                dateToSearch = year + "-" + i;
                System.out.println(dateToSearch);
                timePerIndividualsMonth = getTimeAndDateFromDB(search, dateToSearch, timePerIndividualsMonth);
            }
        }
        return timePerIndividualsMonth;
    }

}
