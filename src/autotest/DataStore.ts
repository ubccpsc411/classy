import {IPushInfo, ICommentInfo, ICommitInfo, IFeedbackGiven, IContainerInput} from "../Types";

export interface IDataStore {

    /**
     * Saves push event (to its own table).
     *
     * Store IContainerInput instead of IPushEvent because this will be
     * easier to resume since it contains course and deliverable info.
     *
     * @param info
     */
    savePush(info: IContainerInput): void;

    /**
     * Saves comment event (to its own table).
     *
     * @param info
     */
    saveComment(info: ICommentInfo): void;
    getCommentRecord(commitUrl: string): ICommentInfo|null;

    saveOutputRecord(outputInfo: ICommitInfo): void;
    getOutputRecord(commitUrl: string): ICommitInfo|null;

    saveFeedbackGivenRecord(request: IFeedbackGiven): void;
    getLatestFeedbackGivenRecord(courseId: string, delivId: string, userName: string): IFeedbackGiven|null;
    getFeedbackGivenRecordForCommit(commitUrl: string, userName: string): IFeedbackGiven|null;
}

/**
 * Simple example for testing.
 */
export class DummyDataStore implements IDataStore {

    private pushes: IContainerInput[] = [];
    private comments: ICommentInfo[] = [];
    private outputRecords: ICommitInfo[] = [];
    private requests: IFeedbackGiven[] = [];

    savePush(info: IContainerInput) {
        this.pushes.push(info);
    }

    public saveComment(info: ICommentInfo) {
        this.comments.push(info);
    }

    public getCommentRecord(commitUrl: string) {
        for (let record of this.comments) {
            if (record.commitUrl === commitUrl) {
                return record;
            }
        }
        return null;
    }


    public saveOutputRecord(outputInfo: ICommitInfo) {
        this.outputRecords.push(outputInfo);
    }

    public getOutputRecord(commitUrl: string) {
        for (let record of this.outputRecords) {
            if (record.commitUrl === commitUrl) {
                return record;
            }
        }
        return null;
    }

    saveFeedbackGivenRecord(request: IFeedbackGiven): void {
        this.requests.push(request);
    }

    getLatestFeedbackGivenRecord(courseId: string, delivId: string, userName: string): IFeedbackGiven|null {
        const shortList: IFeedbackGiven[] = [];
        for (let req of this.requests) {
            if (req.courseId === courseId && req.delivId === delivId && req.userName === userName) {
                shortList.push(req);
            }
        }
        if (shortList.length === 0) {
            return null;
        } else {
            return Math.max.apply(Math, shortList.map(function (o: IFeedbackGiven) {
                return o.timestamp;
            }));
        }
    }

    public getFeedbackGivenRecordForCommit(commitUrl: string, userName: string): IFeedbackGiven|null {
        for (let feedback of this.requests) {
            if (feedback.commitUrl === commitUrl && feedback.userName === userName) {
                return feedback;
            }
        }
        return null;
    }
}




