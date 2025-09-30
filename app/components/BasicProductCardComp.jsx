import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BasicProductCardComp({ details }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{details.title}</CardTitle>
          <CardDescription>{details.description}</CardDescription>
          <CardAction>Buy</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
