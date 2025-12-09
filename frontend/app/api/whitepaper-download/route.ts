import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, organization, email, role, timestamp } = body;

    // Validate required fields
    if (!fullName || !organization || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Store in database (Supabase or configured DB)
    // For now, we'll just log the data
    // In production, implement database storage:
    /*
    const { data, error } = await supabase
      .from('whitepaper_downloads')
      .insert([{
        full_name: fullName,
        organization,
        email,
        role,
        timestamp: timestamp || new Date().toISOString(),
      }]);

    if (error) throw error;
    */

    console.log('Whitepaper download captured:', {
      fullName,
      organization,
      email,
      role,
      timestamp: timestamp || new Date().toISOString()
    });

    // TODO: Trigger confirmation email
    // In production, implement email service:
    /*
    await sendEmail({
      to: email,
      subject: 'Your OFFO Risk Score™ White Paper',
      template: 'whitepaper-confirmation',
      data: {
        fullName,
        downloadLink: 'https://your-domain.com/assets/OFFO-Risk-Score-White-Paper.pdf'
      }
    });
    */

    return NextResponse.json({
      success: true,
      message: 'White paper download request processed successfully'
    });

  } catch (error) {
    console.error('Error processing whitepaper download:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
