import { getDateOnly } from './getDateOnly';

describe('getDateOnly', () => {
    it('指定された日付の時間部分が00:00:00として正しいタイムスタンプが返されることを確認', () => {
        const inputDate = new Date('2025-02-02T15:30:00');
        const expectedDate = new Date('2025-02-02T00:00:00').getTime();

        const result = getDateOnly(inputDate);

        expect(result).toBe(expectedDate);
    });

    it('すでに時間が00:00:00の日時が入力された場合に正しいタイムスタンプが返されることを確認', () => {
        const inputDate = new Date('2025-02-02T00:00:00');
        const expectedDate = new Date('2025-02-02T00:00:00').getTime();

        const result = getDateOnly(inputDate);

        expect(result).toBe(expectedDate);
    });

    it('うるう年の日付が正しく処理されることを確認', () => {
        const inputDate = new Date('2024-02-29T14:00:00');
        const expectedDate = new Date('2024-02-29T00:00:00').getTime();

        const result = getDateOnly(inputDate);

        expect(result).toBe(expectedDate);
    });

    it('同じ日の異なる時間について、タイムスタンプが同じであることを確認', () => {
        const inputDate1 = new Date('2025-02-02T10:00:00');
        const inputDate2 = new Date('2025-02-02T23:59:59');

        const result1 = getDateOnly(inputDate1);
        const result2 = getDateOnly(inputDate2);

        expect(result1).toBe(result2);
    });
});
