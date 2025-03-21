import React from 'react';
import { Card, CardContent } from '../card';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Badge } from '../badge';
import { MEDIA_BASE_URL } from '../../../lib/apiClient';

interface ContractorCardProps {
  id: string;
  attributes: {
    username: string;
    createdAt: string;
    documents: {
      data: Array<{
        attributes: {
          formats: {
            thumbnail?: {
              url: string;
            };
          };
          url: string;
        };
      }>;
    };
    sub_contractor?: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
  };
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export const ContractorCard = ({ id, attributes, selected, onSelect }: ContractorCardProps) => {
  // Get the first document's thumbnail URL or full URL as fallback
  const avatarUrl = attributes.documents?.data?.[0]?.attributes?.formats?.thumbnail?.url || 
                   attributes.documents?.data?.[0]?.attributes?.url || '';
  
  // Format the join date
  const joinDate = new Date(attributes.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Get contractor type from sub_contractor
  const contractorType = attributes.sub_contractor?.data?.attributes?.name || 'N/A';

  return (
    <Card className={`w-full cursor-pointer transition-all duration-200 hover:shadow-md ${selected ? 'ring-2 ring-[#577bff]' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            {avatarUrl ? (
              <AvatarImage src={`${MEDIA_BASE_URL}${avatarUrl}`} alt={attributes.username} />
            ) : (
              <AvatarFallback>{attributes.username.charAt(0).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-base">{attributes.username}</h3>
            <p className="text-sm text-gray-500">{contractorType}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">Joined {joinDate}</div>
          <Badge variant="outline" className="bg-[#1a922d2e] text-[#1a922d] border-none">
            Active
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};