import { isValidEndTime } from './validation';
import { getDateOnly } from './getDateOnly';

jest.mock('./getDateOnly');

describe('isValidEndTime', () => {
    const watchMock = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('終了日時が開始日時より前の場合、エラーメッセージを返す (終日=true)', () => {
        const startDate = new Date('2025-02-02');
        const endDate = new Date('2025-02-01');
        const startTime = '00:00';
        const endTime = '00:00';
        const allDay = true;

        // getDateOnlyのモック
        (getDateOnly as jest.Mock).mockReturnValueOnce(startDate.getTime());
        (getDateOnly as jest.Mock).mockReturnValueOnce(endDate.getTime());

        // watchモック
        watchMock.mockImplementation((field: string) => {
            switch (field) {
                case 'startDate':
                    return startDate;
                case 'endDate':
                    return endDate;
                case 'startTime':
                    return startTime;
                case 'endTime':
                    return endTime;
                default:
                    return null;
            }
        });

        const result = isValidEndTime(watchMock, allDay);
        expect(result).toBe('終了日時が開始日時を超えています');
    });

    it('終了日時が開始日時より後ろの場合、trueを返す (終日=true)', () => {
        const startDate = new Date('2025-01-01');
        const endDate = new Date('2025-01-02');
        const startTime = '00:00';
        const endTime = '00:00';
        const allDay = true;

        // getDateOnlyのモック
        (getDateOnly as jest.Mock).mockReturnValueOnce(startDate.getTime());
        (getDateOnly as jest.Mock).mockReturnValueOnce(endDate.getTime());

        // watchモック
        watchMock.mockImplementation((field: string) => {
            switch (field) {
                case 'startDate':
                    return startDate;
                case 'endDate':
                    return endDate;
                case 'startTime':
                    return startTime;
                case 'endTime':
                    return endTime;
                default:
                    return null;
            }
        });

        const result = isValidEndTime(watchMock, allDay);
        expect(result).toBe(true);
    });

    it('終了時間が開始時間より後ろの場合、trueを返す (終日=false)', () => {
        const startDate = new Date('2025-01-01');
        const endDate = new Date('2025-01-01');
        const startTime = '10:00';
        const endTime = '12:00';
        const allDay = false;

        // getDateOnlyのモック
        (getDateOnly as jest.Mock).mockReturnValueOnce(startDate.getTime());
        (getDateOnly as jest.Mock).mockReturnValueOnce(endDate.getTime());

        // watchモック
        watchMock.mockImplementation((field: string) => {
            switch (field) {
                case 'startDate':
                    return startDate;
                case 'endDate':
                    return endDate;
                case 'startTime':
                    return startTime;
                case 'endTime':
                    return endTime;
                default:
                    return null;
            }
        });

        const result = isValidEndTime(watchMock, allDay);
        expect(result).toBe(true);
    });

    it('終了日時が開始日時と同じで終了時間が後ろの場合、trueを返す (終日=false)', () => {
        const startDate = new Date('2025-01-01');
        const endDate = new Date('2025-01-01');
        const startTime = '10:00';
        const endTime = '12:00';
        const allDay = false;

        // getDateOnlyのモック
        (getDateOnly as jest.Mock).mockReturnValueOnce(startDate.getTime());
        (getDateOnly as jest.Mock).mockReturnValueOnce(endDate.getTime());

        // watchモック
        watchMock.mockImplementation((field: string) => {
            switch (field) {
                case 'startDate':
                    return startDate;
                case 'endDate':
                    return endDate;
                case 'startTime':
                    return startTime;
                case 'endTime':
                    return endTime;
                default:
                    return null;
            }
        });

        const result = isValidEndTime(watchMock, allDay);
        expect(result).toBe(true);
    });

    it('終了日時が開始日時と同じ場合、終了時間が開始時間より早い場合、エラーメッセージを返す (終日=false)', () => {
        const startDate = new Date('2025-01-01');
        const endDate = new Date('2025-01-01');
        const startTime = '10:00';
        const endTime = '09:00';
        const allDay = false;

        // getDateOnlyのモック
        (getDateOnly as jest.Mock).mockReturnValueOnce(startDate.getTime());
        (getDateOnly as jest.Mock).mockReturnValueOnce(endDate.getTime());

        // watchモック
        watchMock.mockImplementation((field: string) => {
            switch (field) {
                case 'startDate':
                    return startDate;
                case 'endDate':
                    return endDate;
                case 'startTime':
                    return startTime;
                case 'endTime':
                    return endTime;
                default:
                    return null;
            }
        });

        const result = isValidEndTime(watchMock, allDay);
        expect(result).toBe('終了日時が開始日時を超えています');
    });
});
