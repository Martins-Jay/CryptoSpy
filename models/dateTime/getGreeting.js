class GreetingModel {
  greetingMessage() {
    const currentHour = new Date().getHours();

    const greeting =
      currentHour < 12
        ? 'Good Morning'
        : currentHour < 18
        ? 'Good Afternoom'
        : 'Good Evening';

    return greeting;
  }
}

export const greetingModelObj = new GreetingModel();
