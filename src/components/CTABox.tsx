import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ExternalLink, Phone, MessageCircle } from "lucide-react";

interface CTABoxProps {
  pdfUrl: string | null;
  sourceUrl: string;
  productName: string;
}

const CTABox = ({ pdfUrl, sourceUrl, productName }: CTABoxProps) => {
  return (
    <Card className="border-2 border-border sticky top-4">
      <CardContent className="p-6 space-y-4">
        <div className="text-center pb-4 border-b-2 border-dashed border-border">
          <span className="text-sm text-muted-foreground">Interested in this tyre?</span>
          <h3 className="font-bold text-xl mt-1">Get Best Price</h3>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-12 text-base" variant="default">
            <Phone className="mr-2 h-5 w-5" />
            Contact Dealer
          </Button>

          <Button className="w-full h-12 text-base" variant="outline">
            <MessageCircle className="mr-2 h-5 w-5" />
            Request Quote
          </Button>
        </div>

        <div className="pt-4 border-t-2 border-dashed border-border space-y-3">
          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Brochure
              </Button>
            </a>
          )}

          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full justify-start mt-3">
              <ExternalLink className="mr-2 h-4 w-4" />
              View on Apollo Tyres
            </Button>
          </a>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Prices may vary. Contact dealer for final pricing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CTABox;
