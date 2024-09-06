import { Paragraph } from "@sdsc/ui/typography";

export default function Reports() {
  return (
    <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center max-w-3xl mx-auto">
      <Paragraph>
        This page to generate PDF files depends on multiple filters:
        <ul className="list-disc ml-10">
          <li>Flu type</li>
          <li>Date range</li>
          <li>Species</li>
          <li>Provenance</li>
        </ul>
        The PRF will contains different graphs that explain distribution of the
        flu and spread speed in different region
      </Paragraph>
    </div>
  );
}
