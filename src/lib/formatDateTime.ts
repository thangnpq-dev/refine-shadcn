import dayjs from 'dayjs';

export const formatDisplayDateTimeValue = ({ format, value }: { format: string; value?: string | Date }) => {
    return value ? dayjs(value).format(format) : '';
};