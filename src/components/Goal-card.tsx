import { formatCurrency } from '@/lib/formatters';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Progress } from './ui/progress';

type Props = {
  period: string,
  currentAmmount: number,
  goal: number,
}
function GoalCard({ period, currentAmmount, goal }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>
          Last
          {' '}
          {period}
        </CardDescription>
        <CardTitle className="text-4xl">{formatCurrency(currentAmmount / 100)}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        of
        {' '}
        {formatCurrency(goal / 100)}
        {' '}
        goal
      </CardContent>
      <CardFooter>
        <Progress value={(currentAmmount / goal) * 100} />
      </CardFooter>
    </Card>
  );
}
export default GoalCard;
