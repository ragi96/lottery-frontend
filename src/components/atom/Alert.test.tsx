import { render } from '@testing-library/react';
import { Alert, Text } from '..';
import { StatusMessages } from '../../types/utils';
import '@testing-library/jest-dom/extend-expect';

const setStatus = (status: StatusMessages) => console.log(status);

test('alert warning renders', () => {
  const { getByTestId } = render(
    <Alert type="warning" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(getByTestId('alert-warning')).toBeInTheDocument();
});

test('alert error renders', () => {
  const { getByTestId } = render(
    <Alert type="error" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(getByTestId('alert-error')).toBeInTheDocument();
});

test('alert success renders', () => {
  const { getByTestId } = render(
    <Alert type="success" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(getByTestId('alert-success')).toBeInTheDocument();
});

test('alert doesnt render', () => {
  const { queryAllByTestId } = render(
    <Alert type="none" setStatus={setStatus}>
      <Text text={'Text Alert'} />
    </Alert>
  );
  expect(queryAllByTestId('alert')).toHaveLength(0);
});
