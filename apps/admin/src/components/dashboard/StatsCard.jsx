import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <Icon
          size={30}
          className="text-zinc-500"
        />
      </CardContent>
    </Card>
  );
}