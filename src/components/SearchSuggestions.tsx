import { useState, useMemo } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getAllMenuItems } from "@/data/restaurants";
import { Search } from "lucide-react";

interface SearchSuggestionsProps {
  onItemSelect: (query: string) => void;
  children: React.ReactNode;
}

export const SearchSuggestions = ({ onItemSelect, children }: SearchSuggestionsProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const allItems = useMemo(() => {
    try {
      return getAllMenuItems() || [];
    } catch (error) {
      console.error('Error loading menu items:', error);
      return [];
    }
  }, []);
  
  const suggestions = useMemo(() => {
    if (!inputValue || inputValue.length < 2 || !allItems || allItems.length === 0) {
      return { items: [], categories: [] };
    }
    
    try {
      const query = inputValue.toLowerCase();
      const itemMatches = allItems
        .filter(item => 
          item?.name?.toLowerCase().includes(query) ||
          item?.description?.toLowerCase().includes(query) ||
          item?.category?.toLowerCase().includes(query)
        )
        .slice(0, 8);
      
      // Get unique categories and cuisines that match
      const categories = [...new Set(allItems
        .filter(item => item?.category?.toLowerCase().includes(query))
        .map(item => item.category)
        .filter(Boolean)
      )].slice(0, 3);
      
      return {
        items: itemMatches || [],
        categories: categories || []
      };
    } catch (error) {
      console.error('Error filtering suggestions:', error);
      return { items: [], categories: [] };
    }
  }, [inputValue, allItems]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div onClick={() => setOpen(true)}>
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search for dishes, restaurants..." 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            {suggestions?.items?.length > 0 && (
              <CommandGroup heading="Menu Items">
                {suggestions.items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => {
                      onItemSelect(item.name);
                      setOpen(false);
                      setInputValue("");
                    }}
                    className="flex items-center gap-3 p-3"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} • {item.category}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            
            {suggestions?.categories?.length > 0 && (
              <CommandGroup heading="Categories">
                {suggestions.categories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={() => {
                      onItemSelect(category);
                      setOpen(false);
                      setInputValue("");
                    }}
                    className="flex items-center gap-3 p-3"
                  >
                    <Search className="h-4 w-4" />
                    <span className="capitalize">{category}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};