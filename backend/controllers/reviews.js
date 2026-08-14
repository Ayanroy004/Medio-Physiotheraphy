import axios from "axios";

export const getGoogleReviews = async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "Google Places API key is not configured",
      });
    }

    if (!placeId) {
      return res.status(500).json({
        success: false,
        message: "Google Place ID is not configured",
      });
    }

    const url = `https://places.googleapis.com/v1/places/${placeId}`;

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
    });

    const place = response.data;

    const reviews = (place.reviews || []).map((review) => ({
      name: review.authorAttribution?.displayName || "Google User",

      photoUrl: review.authorAttribution?.photoUri || null,

      text: review.text?.text || review.originalText?.text || "",

      rating: review.rating || 0,

      relativeTime: review.relativePublishTimeDescription || "",

      publishTime: review.publishTime || null,

      googleMapsUri: review.googleMapsUri || place.googleMapsUri || null,
    }));

    return res.status(200).json({
      success: true,
      data: reviews,
      rating: place.rating || 0,
      totalReviews: place.userRatingCount || 0,
      googleMapsUri: place.googleMapsUri || null,
    });
  } catch (error) {
    console.error(
      "Google Reviews Error:",
      error.response?.data || error.message,
    );

    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Failed to fetch Google reviews",
      error: error.response?.data?.error?.message || error.message,
    });
  }
};
