import {SDMMSummaryView} from "./sdmm/SDMMSummaryView";
import Log from "../../../../common/Log";

export class ViewFactory {

    private static instance: ViewFactory = null;
    private courseName: string = null;

    /**
     * Use getInstance instead.
     */
    private constructor() {
        this.courseName = 'sdmm';
        // this.courseName = 'cs340'; // TODO: change this for other courses
    }

    public static getInstance(): ViewFactory {
        if (ViewFactory.instance === null) {
            ViewFactory.instance = new ViewFactory();
        }
        return ViewFactory.instance;
    }

    public getView(backendUrl: string) {
        // TODO: should these be cached?

        if (this.courseName === 'sdmm') {
            return new SDMMSummaryView(backendUrl);
        } else if (this.courseName === 'cs340') {
            // something else
        } else {
            Log.error("ViewFactory::getView() - ERROR; unknown courseName: " + this.courseName);
        }
    }

    /**
     *
     * Returns the org associated with the course instance.
     *
     * @returns {string}
     */
    public getOrg() {
        if (this.courseName === 'sdmm') {
            return 'secapstone';
        } else if (this.courseName === 'cs340') {
            // something else
        } else {
            Log.error("ViewFactory::getOrg() - ERROR; unknown courseName: " + this.courseName);
        }
    }

    /**
     * Returns the prefix directory for the HTML files specific to the course. While you can have
     * many files in this directory, several are required:
     *
     * landing.html - This is the main course-specific landing page
     * login.html - This is the login page
     * student.html - This is the main student landing page
     * admin.html - This is the main admin landing page
     *
     * @returns {string}
     */
    public getHTMLPrefix() {
        if (this.courseName === 'sdmm') {
            return 'sdmm';
        } else if (this.courseName === 'cs340') {
            return 'cs340';
        } else {
            Log.error("ViewFactory::getHTMLPrefix() - ERROR; unknown courseName: " + this.courseName);
        }
    }
}