import Text "mo:core/Text";

actor {
  public type BusinessProfile = {
    name : Text;
    address : Text;
    description : Text;
    hours : Text;
    socialMedia : SocialMedia;
  };

  public type SocialMedia = {
    instagram : Text;
  };

  public query ({ caller }) func getBusinessInfo() : async BusinessProfile {
    {
      name = "Swaad Wallah Sandwich";
      address = "123 Main Street, Food Plaza, City";
      description = "Delicious, handcrafted sandwiches with fresh ingredients. From classic options to innovative fusion creations, we bring mouthwatering flavors to every bite!";
      hours = "Mon-Sun: 12pm - 10pm";
      socialMedia = {
        instagram = "instagram.com/swaadwallahsandwich";
      };
    };
  };
};
